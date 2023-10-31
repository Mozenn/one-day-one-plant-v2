import Script from "next/script";
import { useEffect } from "react";
import { useRouter } from "next/router";

declare const window: any;

const GoogleAnalytics = () => {
  const router = useRouter();

  // log pageview with url
  const logPageView = (url: URL) => {
    window.gtag("config", process.env.NEXT_PUBLIC_MEASUREMENT_ID, {
      page_path: url,
    });
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
    const handleRouteChange = (url: URL) => {
      logPageView(url);
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      {process.env.NODE_ENV === "production" &&
      typeof window !== "undefined" ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_MEASUREMENT_ID}`}
          />
          <Script id='google-analytics'>
            {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
   
            gtag('config', '${process.env.NEXT_PUBLIC_MEASUREMENT_ID}');
          `}
          </Script>
        </>
      ) : null}
    </>
  );
};

export default GoogleAnalytics;
