import { google } from 'googleapis';

export default async function handler(req, res) {
  const auth = new google.auth.GoogleAuth({
    credentials: JSON.parse(process.env.GOOGLE_SERVICE_KEY),
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });

  const sheets = google.sheets({ version: 'v4', auth });

  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: 'Arkusz1', // Zmień nazwę, jeśli Twój arkusz nazywa się inaczej
    });

    const rows = response.data.values;
    res.status(200).json({ status: 'ok', data: rows });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
}
