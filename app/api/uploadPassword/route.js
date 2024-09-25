import 'server-only';
const dataLib = require('/lib/dataLib');
import { decodeTokenFromReq } from "/lib/authLib";
import { NextResponse } from 'next/server';

export async function POST(req) {
      const { service, username, encryptedPass  } = await req.json();
      const token = await decodeTokenFromReq(req);
      try {
            await dataLib.addCredentials(token.userId, service, username, encryptedPass);
            return NextResponse.json({message: "Success"});
      } catch (error) {
        console.log(error.message);
        return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
      }
}
  