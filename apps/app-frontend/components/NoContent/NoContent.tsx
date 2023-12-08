const NoContent = ({ message = "" }: { message?: string }) => {
  return (
    <div className="flex flex-col items-center justify-center h-80">
      <img
        className="h-20 filter-secondary"
        src="/images/icons/wind.svg"
        alt="wind icon"
      />
      <p className="text-4xl">{message}</p>
    </div>
  );
};

export default NoContent;
