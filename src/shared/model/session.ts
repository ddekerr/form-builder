import { persist } from 'zustand/middleware';
import { jwtDecode } from 'jwt-decode';
import { create } from 'zustand';
import { publicFetchClient } from '../api/instance';

type Session = {
  userId: string;
  email: string;
  exp: number;
  iat: number;
};

interface SessionStore {
  token: string | null;
  session: Session | null;
  login: (token: string) => void;
  logout: () => void;
  refreshToken: () => Promise<string | null>;
}

const TOKEN_KEY = 'accessToken';
let refreshTokenPromise: Promise<string | null> | null = null;

export const useSession = create<SessionStore>()(
  persist(
    (set, get) => ({
      token: null,
      session: null,

      login: (token: string) => {
        const session = jwtDecode<Session>(token);
        set({ token, session });
      },

      logout: () => {
        set({ token: null, session: null });
      },

      refreshToken: async () => {
        const currentSession = get().session;
        const currentToken = get().token;
        if (!currentSession || !currentToken) {
          console.log('No active session to refresh');
          return null;
        }

        if (currentSession.exp < Date.now() / 1000 + 1) {
          if (!refreshTokenPromise) {
            refreshTokenPromise = publicFetchClient
              .POST('/auth/refresh')
              .then((r) => r.data?.accessToken ?? null)
              .then((newToken) => {
                if (newToken) {
                  get().login(newToken);
                  return newToken;
                } else {
                  get().logout();
                  return null;
                }
              })
              .finally(() => {
                refreshTokenPromise = null;
              });
          }

          const newToken = await refreshTokenPromise;

          if (newToken) {
            console.log('Token refreshed successfully');
            return newToken;
          } else {
            console.error('No access token in refresh response');
            return null;
          }
        }

        return currentToken;
      },
    }),
    {
      name: TOKEN_KEY,
      partialize: (state) => ({ token: state.token }),
      onRehydrateStorage: () => (state) => {
        if (state?.token) {
          state.session = jwtDecode<Session>(state.token);
        }
      },
    },
  ),
);
