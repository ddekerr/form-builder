import { HttpResponse } from 'msw';
import type { ApiSchema } from '../../schema';
import { http } from '../http';
import { createRefreshTokenCookie, generateTokens, verifyToken } from '../session';

const userPasswords = new Map<string, string>();
const mockUsers: ApiSchema['User'][] = [
  {
    id: '1',
    email: 'dimon.bond.94@gmail.com',
  },
];

userPasswords.set('dimon.bond.94@gmail.com', '123456');

export const authHandlers = [
  http.post('/auth/login', async ({ request }) => {
    const body: ApiSchema['LoginRequest'] = await request.json();

    const user = mockUsers.find((user) => user.email === body.email);
    if (!user) {
      return HttpResponse.json({ message: 'Користувач не знайдений', code: 'USER_NOT_FOUNND' }, { status: 404 });
    }

    const storedPassword = userPasswords.get(body.email);
    if (!storedPassword || storedPassword !== body.password) {
      return HttpResponse.json({ message: 'Неправильний пароль', code: 'INVALID_CREDENTIALS' }, { status: 401 });
    }

    const { accessToken, refreshToken } = await generateTokens({
      userId: user.id,
      email: user.email,
    });

    return HttpResponse.json(
      { accessToken, user },
      {
        status: 200,
        headers: {
          'Set-Cookie': createRefreshTokenCookie(refreshToken),
        },
      },
    );
  }),

  http.post('/auth/register', async ({ request }) => {
    const body: ApiSchema['RegisterRequest'] = await request.json();

    if (mockUsers.some((user) => user.email === body.email)) {
      return HttpResponse.json({ message: 'Такий користувач вже існує', code: 'USER_EXIST' }, { status: 409 });
    }

    const newUser: ApiSchema['User'] = {
      id: String(mockUsers.length + 1),
      email: body.email,
    };
    mockUsers.push(newUser);

    userPasswords.set(body.email, body.password);

    const { accessToken, refreshToken } = await generateTokens({
      userId: newUser.id,
      email: newUser.email,
    });

    return HttpResponse.json(
      { user: newUser, accessToken },
      {
        status: 201,
        headers: {
          'Set-Cookie': createRefreshTokenCookie(refreshToken),
        },
      },
    );
  }),

  http.post('/auth/refresh', async ({ cookies }) => {
    const refreshToken = cookies.refreshToken;

    if (!refreshToken) {
      return HttpResponse.json(
        {
          message: 'Refresh token Not found',
          code: 'REFRESH_TOKEN_MISSING',
        },
        { status: 401 },
      );
    }

    try {
      const session = await verifyToken(refreshToken);
      const user = mockUsers.find((user) => user.id === session.userId);

      if (!user) {
        throw new Error('User not found');
      }

      const { accessToken, refreshToken: newRefreshToken } = await generateTokens({
        userId: user.id,
        email: user.email,
      });

      return HttpResponse.json(
        {
          accessToken,
          user,
        },
        {
          status: 200,
          headers: {
            'Set-Cookie': createRefreshTokenCookie(newRefreshToken),
          },
        },
      );
    } catch (error) {
      return HttpResponse.json(
        {
          message: 'Invalid refres Token',
          code: 'INVALID_REFRESH_TOKEN',
        },
        { status: 401 },
      );
    }
  }),
];
