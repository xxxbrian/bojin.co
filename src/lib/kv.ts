import { kv } from "@vercel/kv";
import { unstable_noStore as noStore } from "next/cache";

export type ipInfo = {
  ip: string;
  country: string;
  city: string;
  flag: string;
};

export const setLastVisitor = async (ipInfo: ipInfo) => {
  await kv.set("last_visitor", ipInfo);
};

export const getLastVisitor = async () => {
  noStore();
  return await kv.get<ipInfo>("last_visitor");
};
