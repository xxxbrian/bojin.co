import { Redis } from "@upstash/redis";

const url = process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.UPSTASH_REDIS_REST_TOKEN;

if (!url || !token) {
  throw new Error(
    "No UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN found",
  );
}

export const kv = new Redis({ url, token });
