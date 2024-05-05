import { Redis } from "@upstash/redis";
import { env } from "process";

const url = env.UPSTASH_REDIS_REST_URL;
const token = env.UPSTASH_REDIS_REST_TOKEN;

if (!url || !token) {
  throw new Error(
    "No UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN found",
  );
}

const redis = new Redis({ url, token });

export class kv {
  static async get<T>(key: string) {
    return (await redis.get(key)) as T;
  }

  static async set<T>(key: string, value: any) {
    return (await redis.set(key, value)) as T;
  }

  static async update<T>(key: string, value: any) {
    return (await redis.set(key, value)) as T;
  }
}
