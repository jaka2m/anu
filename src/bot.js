// bot.js
import CloudflareChecker from './cf.js';

export default class TelegramBot {
  constructor(telegramToken, cloudflareToken, apiUrl = 'https://api.telegram.org') {
    this.telegramToken = telegramToken;
    this.apiUrl = apiUrl;
    this.cfChecker = new CloudflareChecker(cloudflareToken);
  }

  async handleUpdate(update) {
    if (!update.message || !update.message.text) return;

    const chatId = update.message.chat.id;
    const text = update.message.text.trim();

    if (text === '/domains') {
      try {
        const domains = await this.cfChecker.listDomains();
        const msg = domains.length
          ? `✅ Daftar domain di Cloudflare:\n\n${domains.join('\n')}`
          : 'Tidak ada domain yang ditemukan di akun Cloudflare.';
        await this.sendMessage(chatId, msg);
      } catch (err) {
        await this.sendMessage(chatId, `❌ Gagal mengambil domain: ${err.message}`);
      }
    } else {
      await this.sendMessage(chatId, 'Kirim /domains untuk melihat daftar domain Cloudflare Anda.');
    }
  }

  async sendMessage(chatId, text) {
    const url = `${this.apiUrl}/bot${this.telegramToken}/sendMessage`;
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text })
    });
  }
}
