import "server-only";
import { NextResponse } from "next/server";
import { authLogin, logout, createSession } from "@/lib/authLib";
export async function POST(req) {
  try {
    const { username, password } = await req.json() ;
    const validCredentials = await authLogin(username, password);

    //If credentials are valid create a token and set a cookie
    if (validCredentials) {
      return await createSession(validCredentials);
    }
    // if credentials are not valid, return a 401 error
    else {
      return await logout(req);
    }
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}