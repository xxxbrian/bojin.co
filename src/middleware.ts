import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { updateVisitorInfo } from "@/lib/kv";
import countries from "@/lib/countries.json";

function getIP(request: Request | NextRequest): string {
  // if ("ip" in request && request.ip) {
  //   return request.ip;
  // }

  const cfi = request.headers.get("cf-connecting-ip");
  const xff = cfi ? cfi : request.headers.get("x-forwarded-for");
  if (xff === "::1") {
    return "127.0.0.1";
  }

  return xff?.split(",")?.[0] ?? "127.0.0.1";
}

export async function middleware(request: NextRequest) {
  const { geo, nextUrl } = request;
  // get path basic part
  const path = nextUrl.pathname;

  const ip = getIP(request);
  if (!geo) {
    return NextResponse.next();
  }
  const country = geo.country ?? "unknown";
  const city = geo.city ?? "unknown";
  const countryInfo = countries.find((x) => x.cca2 === country);
  if (countryInfo) {
    const flag = countryInfo.flag;
    await updateVisitorInfo(path, { ip, country, city, flag });
  } else {
    await updateVisitorInfo(path);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
