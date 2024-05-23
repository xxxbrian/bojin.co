import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { IpInfo, updateVisitorInfo } from "@/lib/kv";
import countries from "@/lib/countries.json";

function getXffIP(request: Request | NextRequest): string {
  const xff = request.headers.get("x-forwarded-for");
  if (xff === "::1") {
    return "127.0.0.1";
  }

  return xff?.split(",")?.[0] ?? "127.0.0.1";
}

type CfGeo = {
  ip?: string;
  city?: string;
  country?: string;
  continent?: string;
  longitude?: number;
  latitude?: number;
  region?: string;
  regionCode?: string;
  metroCode?: string;
  postalCode?: string;
  timezone?: string;
  ray?: string;
};

function getCfGeo(request: Request | NextRequest): CfGeo {
  // cf-ipcity: The visitor’s city (value from the ip.src.city field).
  // cf-ipcountry: The visitor’s country (value from the ip.src.country field).
  // cf-ipcontinent: The visitor’s continent (value from the ip.src.continent field).
  // cf-iplongitude: The visitor’s longitude (value from the ip.src.lon field).
  // cf-iplatitude: The visitor’s latitude (value from the ip.src.lat field).
  // cf-region: The visitor’s region (value from the ip.src.region field).
  // cf-region-code: The visitor’s region code (value from the ip.src.region_code field).
  // cf-metro-code: The visitor’s metro code (value from the ip.src.metro_code field).
  // cf-postal-code: The visitor’s postal code (value from the ip.src.postal_code field).
  // cf-timezone: The name of the visitor’s timezone (value from the ip.src.timezone.name field).

  const cfIp = request.headers.get("cf-connecting-ip");
  const cfCity = request.headers.get("cf-ipcity");
  const cfCountry = request.headers.get("cf-ipcountry");
  const cfContinent = request.headers.get("cf-ipcontinent");
  const cfLongitude = request.headers.get("cf-iplongitude");
  const cfLatitude = request.headers.get("cf-iplatitude");
  const cfRegion = request.headers.get("cf-region");
  const cfRegionCode = request.headers.get("cf-region-code");
  const cfMetroCode = request.headers.get("cf-metro-code");
  const cfPostalCode = request.headers.get("cf-postal-code");
  const cfTimezone = request.headers.get("cf-timezone");
  const cfRay = request.headers.get("cf-ray");

  const cfGeo: CfGeo = {};
  if (cfIp) cfGeo.ip = cfIp;
  if (cfCity) cfGeo.city = cfCity;
  if (cfCountry) cfGeo.country = cfCountry;
  if (cfContinent) cfGeo.continent = cfContinent;
  if (cfLongitude) cfGeo.longitude = parseFloat(cfLongitude);
  if (cfLatitude) cfGeo.latitude = parseFloat(cfLatitude);
  if (cfRegion) cfGeo.region = cfRegion;
  if (cfRegionCode) cfGeo.regionCode = cfRegionCode;
  if (cfMetroCode) cfGeo.metroCode = cfMetroCode;
  if (cfPostalCode) cfGeo.postalCode = cfPostalCode;
  if (cfTimezone) cfGeo.timezone = cfTimezone;
  if (cfRay) cfGeo.ray = cfRay;

  return cfGeo;
}

export async function middleware(request: NextRequest) {
  // not vercel production, skip
  if (process.env.VERCEL_ENV !== "production") {
    return NextResponse.next();
  }
  const { geo, nextUrl } = request;
  // get path basic part
  const path = nextUrl.pathname;

  const cfGeo = getCfGeo(request);
  // if cfGeo don't have ip, use the default one
  const ip = cfGeo.ip ?? getXffIP(request);

  const country = cfGeo.country ?? geo?.country ?? "unknown";
  const city = cfGeo.city ?? geo?.city ?? "unknown";
  const flag = countries.find((x) => x.cca2 === country)?.flag ?? "🏳️‍🌈";
  // if (countryInfo) {
  //   const flag = countryInfo.flag;
  //   await updateVisitorInfo(path, { ip, country, city, flag, refPath: path });
  // } else {
  //   await updateVisitorInfo(path);
  // }
  const ipInfo: IpInfo = {
    ip,
    city,
    country,
    continent: cfGeo.continent,
    longitude: cfGeo.longitude,
    latitude: cfGeo.latitude,
    region: cfGeo.region,
    regionCode: cfGeo.regionCode,
    metroCode: cfGeo.metroCode,
    postalCode: cfGeo.postalCode,
    timezone: cfGeo.timezone,
    flag,
    refPath: path,
    cfRay: cfGeo.ray,
  };

  await updateVisitorInfo(path, ipInfo);

  return NextResponse.next();
}

export const config = {
  // matcher: ["/((?!_next|api|.*\\..*).*)"],
  matcher: ["/", "/blog", "/blog/(.*)", "/links", "/links/(.*)"],
};
