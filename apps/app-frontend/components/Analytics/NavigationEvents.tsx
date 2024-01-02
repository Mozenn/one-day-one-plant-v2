"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

declare const window: any;

export function NavigationEvents() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // log pageview with url
  const logPageView = (url: URL) => {
    // TODO remove if not used
    // window.gtag("config", process.env.NEXT_PUBLIC_MEASUREMENT_ID, {
    //   page_path: url,
    // });
  };

  type GTagEvent = {
    action: string;
    category: string;
    label: string;
    value: number;
  };

  // log events
  const logEvent = ({ action, category, label, value }: GTagEvent) => {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  };

  useEffect(() => {
    const url = `${pathname}?${searchParams}`;
    logPageView(new URL(url, process.env.NEXT_PUBLIC_APP_URL));
  }, [pathname, searchParams]);

  return null;
}
