/**
 * use /routePathName/:path* para validar todas a rotas a partir da routePathName
 */

import { NextRequest, NextResponse } from 'next/server';
import { AuthResponse } from '~/src/app/shared/types/responses/AuthResponse';
import { APP_ROUTES } from '~/src/app/shared/utils/constants/app-routes';

export default async function middlwware(nextRequest: NextRequest) {
  const stringfyiedSessionCustomer = nextRequest.cookies.get('_Exy_')?.value;
  const sessionCustomer: AuthResponse =
    stringfyiedSessionCustomer && JSON.parse(stringfyiedSessionCustomer);
  const token = sessionCustomer?.refresh_token;

  const signURL = new URL(APP_ROUTES.public.home, nextRequest.url);

  if (!token) {
    if (nextRequest.nextUrl.pathname === APP_ROUTES.public.home) {
      return NextResponse.next();
    }
    return NextResponse.redirect(signURL);
  }

  if (nextRequest.nextUrl.pathname === APP_ROUTES.public.home) {
    const dashboardUrl = new URL(APP_ROUTES.private.dashboard.name, nextRequest.url);
    return NextResponse.redirect(dashboardUrl);
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
