export { default } from 'next-auth/middleware';

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/apps/:path*',
    '/consent/:path*',
    '/launch/:path*',
    '/runs/:path*',
    '/workers/:path*',
    '/reports/:path*',
    '/billing/:path*',
    '/workspace/:path*'
  ]
};
