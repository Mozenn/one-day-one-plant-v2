import { url } from "inspector";

export type HeroCapsuleProps = {
  url: string;
  alt: string;
  additionalStyle: string;
  additionalImageStyle: string;
};

const HeroCapsule = ({ capsuleProps }: { capsuleProps: HeroCapsuleProps }) => {
  const { url, alt, additionalStyle, additionalImageStyle } = capsuleProps;

  return (
    <div
      className={`absolute transition-transform hover:scale-125
       duration-500 w-64 ${additionalStyle} z-0`}
    >
      <img
        src={url}
        alt={alt}
        className={`border-solid border-8 border-primary rounded-3xl ${additionalImageStyle}`}
      />
    </div>
  );
};

export default HeroCapsule;
