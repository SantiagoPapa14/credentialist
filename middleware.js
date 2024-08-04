const { validateSession } = require("./lib/authLib");

export async function middleware(request) {
  return await validateSession(request);
}

export const config = {
  matcher: '/credentials'
}