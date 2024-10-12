import "server-only";
import { NextResponse } from "next/server";
import { registerUser } from "@/lib/authLib";

export async function POST(req) {
  try {
    const { username, password } = await req.json();
    const newUser = await registerUser(username, password);
    return NextResponse.json(
      { message: "Created!", user: newUser },
      { status: 201 }
    );
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}