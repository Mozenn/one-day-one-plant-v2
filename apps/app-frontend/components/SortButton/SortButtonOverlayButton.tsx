const SortButtonOverlayButton = ({
  label,
  direction,
  currentDirection,
  additionalStyles,
  onButtonClick,
}: {
  label: string;
  direction: string;
  currentDirection: string;
  additionalStyles?: string;
  onButtonClick: () => void;
}) => {
  return (
    <button
      className={`bg-background text-secondary-dark border-none text-base cursor-pointer outline-none
  ${
    direction === currentDirection && "bg-primary text-white"
  } ${additionalStyles}`}
      onClick={onButtonClick}
    >
      {label}
    </button>
  );
};

export default SortButtonOverlayButton;
