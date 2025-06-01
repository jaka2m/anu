// worker.js
import TelegramBot from './bot.js';

const TELEGRAM_BOT_TOKEN = 'ISI_TOKEN_BOT_TELEGRAM';
const CLOUDFLARE_API_TOKEN = 'ISI_API_TOKEN_CLOUDFLARE';

const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, CLOUDFLARE_API_TOKEN);

// Untuk Cloudflare Workers atau Fetch-based server
export default {
  async fetch(request) {
    if (request.method !== 'POST') {
      return new Response('Gunakan metode POST', { status: 405 });
    }

    try {
      const update = await request.json();
      await bot.handleUpdate(update);
      return new Response('OK', { status: 200 });
    } catch (err) {
      return new Response('Terjadi kesalahan: ' + err.message, { status: 500 });
    }
  }
};
