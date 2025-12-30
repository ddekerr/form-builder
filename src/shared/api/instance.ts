import createFetchClient from 'openapi-fetch';
import createClient from 'openapi-react-query';
import { CONFIG } from '../model/config';
import type { ApiPath, ApiSchema } from './schema';
import { useSession } from '../model/session';

export const fetchClient = createFetchClient<ApiPath>({ baseUrl: CONFIG.API_BASE_URL });
export const rqClient = createClient(fetchClient);

export const publicFetchClient = createFetchClient<ApiPath>({ baseUrl: CONFIG.API_BASE_URL });
export const publicRqClient = createClient(publicFetchClient);

fetchClient.use({
  async onRequest({ request }) {
    const token = await useSession.getState().refreshToken();

    if (token) {
      request.headers.set('Authorization', `Bearer ${token}`);
    } else {
      return new Response(
        JSON.stringify({
          message: 'U r not authorized',
          code: 'NOT_AUTHORIZED',
        } as ApiSchema['Error']),
        {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        },
      );
    }
  },
});
