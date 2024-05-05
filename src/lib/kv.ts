import { kv as vercelKV } from "@vercel/kv";
import { kv as cloudflareKV } from "./cloudflare-kv";
import { kv as upstashKV } from "./upstash-kv";
import { unstable_noStore as noStore } from "next/cache";

const kv = upstashKV;

export type ipInfo = {
  ip: string;
  country: string;
  city: string;
  flag: string;
};

export const setLastVisitor = async (ipInfo: ipInfo) => {
  await kv.set("last_visitor", ipInfo);
};

export const setCurrentVisitor = async (ipInfo: ipInfo) => {
  const lv = await kv.get<ipInfo>("current_visitor");
  await kv.set("current_visitor", ipInfo);
  if (lv) {
    await kv.set("last_visitor", lv);
  }
};

export const incrVisitorCount = async (path?: string) => {
  const key = path ? `visitor_count_${path}` : "visitor_count";
  await kv.incr(key);
};

export const getLastVisitor = async () => {
  noStore();
  return await kv.get<ipInfo>("last_visitor");
};

export const getCurrentVisitor = async () => {
  noStore();
  return await kv.get<ipInfo>("current_visitor");
};

export const getVisitorCount = async (path?: string) => {
  noStore();
  const key = path ? `visitor_count_${path}` : "visitor_count";
  const vc = await kv.get<number>(key);
  if (!vc) {
    await kv.set("visitor_count", 0);
    return 0;
  }
  return vc;
};
