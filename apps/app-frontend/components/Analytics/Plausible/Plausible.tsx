import Script from "next/script";

declare const window: any;

const Plausible = ({
  appDomain,
  hostDomain,
}: {
  appDomain?: string;
  hostDomain?: string;
}) => {
  return (
    <>
      {process.env.NODE_ENV === "production" &&
      typeof window !== "undefined" ? (
        <>
          <Script
            id="plausible"
            defer
            async
            data-domain={
              appDomain || process.env.NEXT_PUBLIC_PLAUSIBLE_APP_DOMAIN
            }
            src={`https://${
              hostDomain || process.env.NEXT_PUBLIC_PLAUSIBLE_HOST_DOMAIN
            }/js/plausible.js`}
          />
          <Script
            id="plausible-init"
            dangerouslySetInnerHTML={{
              __html: `window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) }`,
            }}
          />
        </>
      ) : null}
    </>
  );
};

export default Plausible;
