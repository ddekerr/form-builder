import { setupWorker } from 'msw/browser';
import { formsHandlers } from './handlers/forms';
import { authHandlers } from './handlers/auth';

export const worker = setupWorker(...formsHandlers, ...authHandlers);
