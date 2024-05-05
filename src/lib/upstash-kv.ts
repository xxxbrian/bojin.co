import { Redis } from "@upstash/redis";
import { env } from "process";

const url = env.UPSTASH_REDIS_REST_URL;
const token = env.UPSTASH_REDIS_REST_TOKEN;

if (!url || !token) {
  throw new Error(
    "No UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN found",
  );
}

export const kv = new Redis({ url, token });
