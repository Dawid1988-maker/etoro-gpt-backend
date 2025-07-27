import { Telegraf } from 'telegraf';

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

export default async function handler(req, res) {
  try {
    const body = req.body;

    if (body.message && body.chat_id) {
      const chatId = body.chat_id;
      const userMessage = body.message;

      await bot.telegram.sendMessage(chatId, userMessage);
    }

    res.status(200).json({ OK: true });
  } catch (error) {
    console.error('Błąd:', error);
    res.status(500).json({ błąd: 'Wystąpił błąd' });
  }
}
