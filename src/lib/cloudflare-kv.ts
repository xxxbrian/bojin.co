const endpoint = "kv-worker.bojin.workers.dev";
export class kv {
  // GET /get
  static async get<T>(key: string) {
    const res = await fetch(`https://${endpoint}/get?key=${key}`);
    return await res.json().then((data) => data.value as T);
  }

  // POST /set
  static async set<T>(key: string, value: any) {
    const res = await fetch(`https://${endpoint}/set`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ key, value }),
    });
    return await res.json().then((data) => data.value as T);
  }

  // POST /update
  static async update<T>(key: string, value: any) {
    const res = await fetch(`https://${endpoint}/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ key, value }),
    });
    return await res.json().then((data) => data.value as T);
  }
}
