import { google } from 'googleapis';
import { NextResponse } from 'next/server';
import dotenv from 'dotenv';

dotenv.config();

export async function GET() {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY),
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: '1ADDM_lOWCMewrxPBta1q8cHhKIA0ET2FecUUdXqpdjQ',
      range: 'Arkusz1!A1:Z1000',
    });

    return NextResponse.json({ data: response.data.values });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
