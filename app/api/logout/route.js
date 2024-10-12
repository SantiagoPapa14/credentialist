import "server-only";
import { NextResponse } from "next/server";
import { logout } from "@/lib/authLib";
 
export async function GET(req) {
  try {
    return await logout(req);
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}