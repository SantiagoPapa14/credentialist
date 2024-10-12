import 'server-only';
const dataLib = require('/lib/dataLib');
import { decodeTokenFromReq } from "/lib/authLib";
import { NextResponse } from 'next/server';

export async function GET(req) {
      const token = await decodeTokenFromReq(req);
      try {
            const credentials= await dataLib.selectServicesAndUsernames(token.userId);
            return NextResponse.json({
                credentials: credentials,
                message: "Success"});
      } catch (error) {
        console.log(error.message);
        return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
      }
}
  