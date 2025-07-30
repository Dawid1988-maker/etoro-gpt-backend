import { google } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config();

export default async function handler(req, res) {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(process.env.GOOGLE_SERVICE_KEY),
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: 'Arkusz1!A1:Z1000', // <-- Zakres danych z arkusza
    });

    const data = response.data.values;
    res.status(200).json({ data });
  } catch (error) {
    console.error('Błąd pobierania danych:', error);
    res.status(500).json({ error: 'Wystąpił błąd podczas pobierania danych.' });
  }
}
