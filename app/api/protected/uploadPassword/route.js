import 'server-only';
const dataLib = require('/lib/dataLib');
import { NextResponse } from 'next/server';

export async function POST(req) {
      const { service, username, encryptedPass  } = await req.json();
      try {
          console.log(service, username, encryptedPass);
            await dataLib.addCredentials(service, username, encryptedPass);
            return NextResponse.json({});
      } catch (error) {
        console.log(error.message);
        return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
      }
}
  