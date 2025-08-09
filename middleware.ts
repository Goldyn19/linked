export { default } from 'next-auth/middleware'
//'/links', '/profile', '/preview'
export const config = {matcher:['/links', '/profile', '/preview', '/link-analysis/:path*']}