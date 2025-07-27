export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { message } = req.body;

    if (message && message.text) {
      const chatId = message.chat.id;
      const userText = message.text;

      const replyText = `Cześć! Otrzymałem Twoją wiadomość: "${userText}"`;

      const token = '8273022564:AAE2W0s6X_eXJbH6gp0t00hNZyvIG5NsZqc';
      const url = `https://api.telegram.org/bot${token}/sendMessage`;

      await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: replyText,
        }),
      });
    }

    res.status(200).send('OK');
  } else {
    res.status(405).send('Metoda niedozwolona');
  }
}
