import Script from "next/script";

declare const window: any;

const GoogleAnalytics = () => {
  return (
    <>
      {process.env.NODE_ENV === "production" &&
      typeof window !== "undefined" ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_MEASUREMENT_ID}`}
          />
          <Script id="google-analytics">
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
