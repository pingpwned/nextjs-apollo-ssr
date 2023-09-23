export class CacheUtil {
  public cache: any;
  constructor() {
    this.cache = {};
  }

  private isExpired(obj: any): boolean {
    if (!obj || obj.length < 1) return true;
    const currentTime = Date.now();
    const { expiration } = obj;
    const expired = currentTime - expiration >= 10000;

    return expired;
  }

  public get(key: string) {
    if (!this.isExpired(this.cache[key])) return this.cache[key];
    this.cache[key] = null;
    return;
  }

  public set(key: string, value: any) {
    this.cache[key] = value;
  }
}
