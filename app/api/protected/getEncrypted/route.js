import 'server-only';
const dataLib = require('/lib/dataLib');
import { NextResponse } from 'next/server';

export async function POST(req) {
      const { service, username  } = await req.json();
      try {
            const sqlResult = await dataLib.getPassword(service, username);
            const encryptedPassword = sqlResult[0].password;
            return NextResponse.json({ password: encryptedPassword });
      } catch (error) {
        console.log(error.message);
        return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
      }
}
  