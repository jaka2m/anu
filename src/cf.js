// cf.js
export default class CloudflareChecker {
  constructor(apiToken) {
    this.apiToken = apiToken;
    this.apiUrl = 'https://api.cloudflare.com/client/v4';
  }

  async listDomains() {
    const response = await fetch(`${this.apiUrl}/zones`, {
      headers: {
        'Authorization': `Bearer ${this.apiToken}`,
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    if (!data.success) {
      throw new Error('Gagal mengambil daftar domain dari Cloudflare');
    }

    return data.result.map(zone => zone.name);
  }
}
