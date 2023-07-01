export class Http {
  private _fetch;
  constructor(_fetch = fetch) {
    this._fetch = fetch;
  }
  async get(url: string) {
    const response = await this._fetch(url);
    return response.json();
  }
}
