export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Metoda niedozwolona' });
  }

  const { message } = req.body;

  if (!message || !message.text) {
    return res.status(400).json({ message: 'Brak wiadomości' });
  }

  const chatId = message.chat.id;
  const userMessage = message.text;

  const replyMessage = `Otrzymałem Twoją wiadomość: "${userMessage}" 👋`;

  const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
  const TELEGRAM_API = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;

  const response = await fetch(TELEGRAM_API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text: replyMessage,
    }),
  });

  if (!response.ok) {
    return res.status(500).json({ message: 'Błąd przy wysyłaniu odpowiedzi' });
  }

  return res.status(200).json({ message: 'Odpowiedź wysłana' });
}
