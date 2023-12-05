import styles from "./Error.module.scss";

const Error = ({
  message = "404 Page not found",
  secondaryMessage,
}: {
  message: string;
  secondaryMessage?: string;
}) => {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-[100vh]">
        <img
          className="h-20 filter-danger"
          src="/images/icons/leaf.svg"
          alt="leaf icon"
        />
        <p className="text-2xl text-danger">{message}</p>
        {secondaryMessage && (
          <p className="text-base mt-0">{secondaryMessage}</p>
        )}
      </div>
    </>
  );
};

export default Error;
