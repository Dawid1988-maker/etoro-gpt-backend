import { google } from 'googleapis';

export default async function handler(req, res) {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(process.env.GOOGLE_SERVICE_KEY),
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.ID_ARKUSZY_KALKULACYJNEJ,
      range: 'portfel_etero_sara', 

    const rows = response.data.values;
    res.status(200).json({ status: 'ok', data: rows });
  } catch (error) {
    console.error('Błąd backendu:', error); // dodajemy log
    res.status(500).json({ status: 'error',
    message: error.message,
    stack: error.stack,
  });
}
  }
}
