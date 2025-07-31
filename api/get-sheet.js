import { google } from 'googleapis';
import dotenv from 'dotenv';
dotenv.config();

export default async function handler(req, res) {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: Buffer.from(process.env.GOOGLE_PRIVATE_KEY_BASE64, 'base64').toString('utf-8'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'Arkusz1!A1:Z1000',
    });

    res.status(200).json({ data: response.data.values });
  } catch (error) {
    console.error('Błąd pobierania danych z Google Sheets:', error);
    res.status(500).json({ error: 'Błąd serwera przy pobieraniu danych z Google Sheets' });
  }
}

