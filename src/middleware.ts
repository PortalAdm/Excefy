import { NextRequest, NextResponse } from 'next/server';
import { AuthResponse } from '~/src/app/shared/types/responses/AuthResponse';
import { APP_ROUTES } from '~/src/app/shared/utils/constants/app-routes';

export default async function middleware(nextRequest: NextRequest) {
  const stringifiedSessionCustomer = nextRequest.cookies.get('_Exy_')?.value;

  const sessionCustomer: AuthResponse =
    stringifiedSessionCustomer && JSON.parse(stringifiedSessionCustomer);
  const token = sessionCustomer?.refresh_token;

  const signURL = nextRequest.nextUrl.clone();
  signURL.pathname = APP_ROUTES.public.home;

  if (!token) {
    const allowedWithoutAuth = [APP_ROUTES.public.home, '/new-process'];

    if (allowedWithoutAuth.includes(nextRequest.nextUrl.pathname)) {
      return NextResponse.next();
    }

    return NextResponse.redirect(signURL);
  }

  if (nextRequest.nextUrl.pathname === APP_ROUTES.public.home) {
    const projectsUrl = nextRequest.nextUrl.clone();
    projectsUrl.pathname = APP_ROUTES.private.projects.name;

    return NextResponse.redirect(projectsUrl);
  }
}

export const config = {
  matcher: [
    '/',
    '/dashboard',
    '/agents',
    '/edit-process/:path',
    '/new-process',
    '/process-config',
    '/schedule'
  ]
};
