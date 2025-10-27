"use client";

import { useEffect } from "react";
import { init } from "@plausible-analytics/tracker";

const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN ?? "bojin.co";
const endpoint = "https://analytics.nszero.org/api/event";
let initialized = false;

export function PlausibleTracker() {
  useEffect(() => {
    if (!initialized) {
      init({
        domain,
        endpoint,
        autoCapturePageviews: true,
        outboundLinks: true,
        fileDownloads: true,
        formSubmissions: true,
      });
      initialized = true;
    }
  }, []);

  return null;
}
