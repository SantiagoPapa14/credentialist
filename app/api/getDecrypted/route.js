const cryptLib = require('/lib/encryptionLib');
const dbLib = require('/lib/sqlLib');
import { NextResponse } from 'next/server';

export async function POST(req) {
      const { service, username, masterKey  } = await req.json();
      try {
            const encryptedPassword = await dbLib.getPassword(service, username);
            //const decryptedPassword = cryptLib.decryptPassword(encryptedPassword, masterKey);
        
            return NextResponse.json({ password: encryptedPassword });
      } catch (error) {
        return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
      }
}
  