const { updateSession } = require("./lib/authLib");

export async function middleware(request) {
  return await updateSession(request);
}