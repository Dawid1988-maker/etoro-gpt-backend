import { google } from 'googleapis';

export default async function handler(req, res) {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(process.env.KLUCZ_USŁUGI_GOOGLE),
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.ID_ARKUSZY_KALKULACYJNEJ,
      range: 'Arkusz1', // Jeśli Twój arkusz ma inną nazwę, zmień tu
    });

    const rows = response.data.values;
    res.status(200).json({ status: 'ok', data: rows });
  } catch (error) {
    console.error('Błąd backendu:', error); // dodajemy log
    res.status(500).json({ status: 'error', message: error.message });
  }
}
