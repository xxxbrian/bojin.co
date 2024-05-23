import { kv as vercelKV } from "@vercel/kv";
import { kv as cloudflareKV } from "./cloudflare-kv";
import { kv as upstashKV } from "./upstash-kv";
import { unstable_noStore as noStore } from "next/cache";

const kv = upstashKV;

export type IpInfo = {
  ip: string;
  city: string;
  country: string;
  continent?: string;
  longitude?: number;
  latitude?: number;
  region?: string;
  regionCode?: string;
  metroCode?: string;
  postalCode?: string;
  timezone?: string;
  flag: string;
  refPath?: string;
};

const vcKey = (path?: string) =>
  path ? `visitor_count_${path}` : "visitor_count";

export const updateVisitorInfo = async (
  path: string,
  currentVisitor?: IpInfo,
) => {
  noStore();
  try {
    const pipeline = kv.multi();

    if (currentVisitor) {
      pipeline.lpush("visitor_queue", currentVisitor);
      // pipeline.ltrim("visitor_queue", 0, 150000);
    }
    // pipeline.incr(vcKey(path));
    const results = await pipeline.exec();
    console.log("updateVisitorInfo", results);
  } catch (error) {
    console.error("updateVisitorInfo", error);
  }
};

export const getVisitorInfoAndCount = async (path?: string) => {
  noStore();
  try {
    const pipeline = kv.multi();

    pipeline.lrange("visitor_queue", 0, 1);
    // pipeline.get(vcKey(path));
    pipeline.incr(vcKey(path));

    const results = await pipeline.exec();

    const [visitorQueue, visitorCount] = results as [Array<IpInfo>, number];
    console.log("getVisitorInfoAndCount", visitorQueue, visitorCount);
    return {
      lastVisitors: visitorQueue[1],
      visitorCount: visitorCount,
    };
  } catch (error) {
    console.error("getVisitorInfoAndCount", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorIpInfo = {
      ip: errorMessage.slice(0, 40),
      city: "error",
      country: "error",
      flag: "🏳️‍🌈",
      refPath: "error",
    } as IpInfo;
    return {
      lastVisitors: errorIpInfo,
      visitorCount: 0,
    };
  }
};
