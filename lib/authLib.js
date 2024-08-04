import 'server-only';
const { compare } = require("bcryptjs");
const jwt = require('jsonwebtoken');
const { SignJWT, jwtVerify } = require('jose');
const { NextRequest, NextResponse } = require("next/server");
const { cookies } = require("next/headers");

const secretKey = process.env.JWT_SECRET;
const hashedPass = process.env.HASHED_PASSWORD;
const hashedUsername = process.env.HASHED_USER;

async function generateToken(payload) {
    return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("10 min from now")
    .sign(new TextEncoder().encode(secretKey));
}

export async function decodeToken(token){
    const { payload } = await jwtVerify(token, new TextEncoder().encode(secretKey));
    if(payload.hasLogged == 1404039529){
        return payload;
    }
  }

async function validatePassword(password) {
    const validPassword = await compare(password, hashedPass);
    return validPassword;
}

async function validateUsername(username) {
    const validUsername = await compare(username, hashedUsername);
    return validUsername;
}

export async function login(formData) {
      
    const credentials = { 
        username: formData.get("username"),
        password: formData.get("password")
        };
    
    try{
        const validUser = await validateUsername(credentials.username);
        if(!validUser){
            throw Error("Invalid credentials.");
        }
        const validPassword = await validatePassword(credentials.password);
        if(!validPassword){
            throw Error("Invalid credentials.");
        }
        credentials['hasLogged']=1404039529;
        const expiration = new Date(Date.now() + 10 * 60 * 1000);
        const token = await generateToken(credentials);
        cookies().set("session", token, {expiration, httpOnly: true});
    }catch(error){
        cookies().set("session", "", { expires: new Date(0) });
    }    
}

export async function logout() {
    console.log('Logging out');
    cookies().set("session", "", { expires: new Date(0) });
}

export async function getSession() {
    const session = cookies().get("session")?.value;
    if (!session) return null;
    return await decodeToken(session);
}

export async function validateSession(req){ 
    const session = req.cookies.get("session")?.value;
    if (!session){
        return NextResponse.redirect(
            new URL('/login', req.url)
        )
    };
    const parsed = await decodeToken(session);
    if (parsed.hasLogged != 1404039529){
        return NextResponse.redirect(
            new URL('/login', req.URL)
        )
    };
    return await updateSession(parsed, req);
}

async function updateSession(userData, req) {
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