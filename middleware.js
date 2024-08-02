const { updateSession } = require("./authLib");

export async function middleware(request) {
  return await updateSession(request);
}