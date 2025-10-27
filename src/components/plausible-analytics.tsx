"use client";

import { useEffect } from "react";
import { init } from "@plausible-analytics/tracker";

export function PlausibleAnalytics() {
  useEffect(() => {
    init({
      domain: "bojin.co",
      apiHost: "https://analytics.nszero.org",
      autoPageviews: true,
      outboundLinks: true,
      fileDownloads: true,
      formSubmissions: true,
    });
  }, []);

  return null;
}

