import { url } from "inspector";

export type HeroCapsuleProps = {
  url: string;
  alt: string;
  additionalStyle: string;
  borderColor: string;
};

const HeroCapsule = ({ capsuleProps }: { capsuleProps: HeroCapsuleProps }) => {
  const { url, alt, additionalStyle, borderColor } = capsuleProps;

  return (
    <div
      className={`absolute transition-transform hover:scale-125
       duration-500 w-64 ${additionalStyle}`}
    >
      <img
        src={url}
        alt={alt}
        className={`border-solid border-8 border-${borderColor} rounded-3xl`}
      />
    </div>
  );
};

export default HeroCapsule;
