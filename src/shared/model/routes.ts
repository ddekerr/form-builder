export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  BUILDER: '/builder',
  FORMS: '/forms',
  FORM: '/forms/:formId',
} as const;

export type PathParams = {
  [ROUTES.FORM]: string;
};
