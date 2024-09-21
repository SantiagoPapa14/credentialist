import 'server-only';
const { compare } = require("bcryptjs");
const { SignJWT, jwtVerify } = require('jose');
const { NextResponse } = require("next/server");
const { cookies } = require("next/headers");
const {getUser} = require("./dataLib");

const secretKey = process.env.JWT_SECRET;

async function generateToken(payload) {
    return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("10 min from now")
    .sign(new TextEncoder().encode(secretKey));
}

export async function decodeToken(token){
    const { payload } = await jwtVerify(token, new TextEncoder().encode(secretKey));
    return payload;
}

export async function getSession() {
    const session = cookies().get("session")?.value;
    if (!session) return null;
    return await decodeToken(session);
}

export async function validateSession(req) {
  const session = req.cookies.get("session")?.value;
  if (!session) {
    console.log("No session")
    return await logout(req);
  }
  const dataFromToken = (await decodeToken(session));
  if (!dataFromToken) {
    console.log("Invalid token")
    return await logout(req);
  }
  return await updateSession(dataFromToken);
}

async function updateSession(userData) {
    userData.expires = new Date(Date.now() + 10 * 60 * 1000);
    const res = NextResponse.next();
    res.cookies.set({
      name: "session",
      value: await generateToken(userData),
      httpOnly: true,
      expires: userData.expires,
    });
    return res;
  }
 
  export async function createSession(userData) {
  const response = NextResponse.json(
    { message: "Logged in!" },
    { status: 200 }
  );
  response.cookies.set({
    name: "session",
    value: await generateToken(userData),
    httpOnly: true,
    expires: new Date(Date.now() + 30 * 60 * 1000),
  });
  return response;
}

export async function authLogin(username, password) {
    const userData = await getUser(username); 
    const passwordMatch = await compare(
      password,
      userData.hashedPassword
    );
    if (passwordMatch) {
      return userData;
    }
  return null;
}

export async function logout(req) {
        const res = NextResponse.redirect(new URL("/login", req.url));
        res.cookies.set({
            name: "session",
            value: null,
            httpOnly: true,
            expires: Date.now(),
        });
        return res;
}
