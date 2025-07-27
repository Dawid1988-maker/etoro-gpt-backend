import { Telegraf } from 'telegraf';

const bot = new Telegraf(process.env.BOT_TOKEN);

export default async function handler(req, res) {
  try {
    const body = req.body;

    if (body.message && body.message.text) {
      const chatId = body.message.chat.id;
      const userMessage = body.message.text;

      // Przykładowa odpowiedź
      await bot.telegram.sendMessage(chatId, `Wiadomość odebrana: ${userMessage}`);
    }

    res.status(200).json({ ok: true });
  } catch (error) {
    console.error('Błąd:', error);
    res.status(500).json({ error: 'Wystąpił błąd w webhooku Telegrama.' });
  }
}
