import kv from "@vercel/kv";

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
  return await kv.get<ipInfo>("last_visitor");
};
