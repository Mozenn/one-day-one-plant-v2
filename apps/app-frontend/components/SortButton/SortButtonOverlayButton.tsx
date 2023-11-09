const SortButtonOverlayButton = ({
  label,
  direction,
  currentDirection,
  onButtonClick,
}: {
  label: string;
  direction: string;
  currentDirection: string;
  onButtonClick: () => void;
}) => {
  return (
    <button
      className={`bg-background text-secondary-dark border-none text-base cursor-pointer outline-none
  ${direction === currentDirection && "bg-primary text-white"}`}
      onClick={onButtonClick}
    >
      {label}
    </button>
  );
};

export default SortButtonOverlayButton;
