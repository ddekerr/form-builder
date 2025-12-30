import { createOpenApiHttp } from 'openapi-msw';
import type { ApiPath } from '../schema';
import { CONFIG } from '@/shared/model/config';

export const http = createOpenApiHttp<ApiPath>({
  baseUrl: CONFIG.API_BASE_URL,
});
