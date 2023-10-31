const ResetButton = ({ reset }: { reset: () => void }) => {
  return (
    <button
      onClick={reset}
      className='w-fit bg-background border-solid border-primary-dark border-2 rounded-xl cursor-pointer
     transition-colors duration-200
     hover:bg-primary-light active:bg-primary'
    >
      <img
        className='h-5 w-5 p-1 filter-primary-dark'
        src='/images/icons/reload.svg'
        alt='reload icon'
      />
    </button>
  );
};

export default ResetButton;
