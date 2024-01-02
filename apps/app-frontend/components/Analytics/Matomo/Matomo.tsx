import Script from "next/script";

declare const window: any;

const Matomo = () => {
  return (
    <>
      {typeof window !== "undefined" ? (
        <>
          <Script
            src={`${process.env.NEXT_PUBLIC_MATOMO_CONTAINER_SCRIPT}`}
            async={true}
          />
          <Script id="matomo">
            {`
              var _mtm = window._mtm = window._mtm || [];
              _mtm.push({'mtm.startTime': (new Date().getTime()), 'event': 'mtm.Start'});
              (function() {
                var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
                s.parentNode.insertBefore(g,s);
              })();
          `}
          </Script>
        </>
      ) : null}
    </>
  );
};

export default Matomo;
