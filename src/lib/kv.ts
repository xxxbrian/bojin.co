import { kv as vercelKV } from "@vercel/kv";
import { kv as cloudflareKV } from "./cloudflare-kv";
import { unstable_noStore as noStore } from "next/cache";

const kv = cloudflareKV;

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
export const getLastVisitor = async () => {
  noStore();
  return await kv.get<ipInfo>("last_visitor");
};

export const getCurrentVisitor = async () => {
  noStore();
  return await kv.get<ipInfo>("current_visitor");
};
