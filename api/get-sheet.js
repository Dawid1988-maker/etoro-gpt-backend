import { google } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config();

export default async function handler(req, res) {
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

    res.status(200).json({ data: response.data.values });
  } catch (error) {
    console.error('Błąd pobierania danych z arkusza:', error);
    res.status(500).json({ error: 'Wystąpił błąd podczas pobierania danych.' });
  }
}



