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

const vcKey = (path?: string) =>
  path ? `visitor_count_${path}` : "visitor_count";
export const updateVisitorInfo = async (
  path: string,
  currentVisitor?: ipInfo,
) => {
  try {
    const pipeline = kv.multi();

    if (currentVisitor) {
      pipeline.lpush("visitor_queue", currentVisitor);
      pipeline.ltrim("visitor_queue", 0, 150000);
    }
    pipeline.incr(vcKey(path));
    await pipeline.exec();
  } catch (error) {
    console.log(error);
  }
};

export const getVisitorInfoAndCount = async (path?: string) => {
  noStore();
  try {
    const pipeline = kv.multi();

    pipeline.lrange("visitor_queue", 0, 1);
    pipeline.get(vcKey(path));

    const results = await pipeline.exec();

    const [visitorQueue, visitorCount] = results as [Array<ipInfo>, number];
    console.log(visitorQueue, visitorCount);
    return {
      lastVisitors: visitorQueue[1],
      visitorCount: visitorCount,
    };
  } catch (error) {
    console.log(error);
    const errorIpInfo = {
      ip: error as string,
      city: "error",
      country: "error",
      flag: "🏳️‍🌈",
    };
    return {
      lastVisitors: errorIpInfo,
      visitorCount: 0,
    };
  }
};
