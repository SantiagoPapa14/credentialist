const dataLib = require('/lib/dataLib');
import { ConstructionOutlined } from '@mui/icons-material';
import { NextResponse } from 'next/server';

export async function POST(req) {
      const { service, username, masterKey  } = await req.json();
      try {
            const sqlResult = await dataLib.getPassword(service, username);
            const encryptedPassword = sqlResult[0].password;
            const decryptedPassword = await dataLib.decrypt(encryptedPassword, masterKey);
            return NextResponse.json({ password: decryptedPassword });
      } catch (error) {
        console.log(error.message);
        return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
      }
}
  