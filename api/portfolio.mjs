import { google } from 'googleapis'

export default async function handler(req, res) {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(process.env.GOOGLE_SERVICE_KEY),
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = process.env.ID_ARKUSZY_KALKULACYJNE;

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'portfel_etoro_sara!A1:F100',
    });

    const rows = response.data.values;
    res.status(200).json({ data: rows });
  } catch (error) {
    console.error('Błąd przy pobieraniu danych:', error);
    res.status(500).json({ error: 'Coś poszło nie tak 🙁' });
  }
}



