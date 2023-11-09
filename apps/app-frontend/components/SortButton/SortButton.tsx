import { useContext, useState } from "react";
import { SortContext } from "../../contexts/sortContext";
import SortButtonOverlay from "./SortButtonOverlay";
import SmallTooltip from "../Tooltip/SmallTooltip";

const SortButton = () => {
  const { sortParams, showOverlay, setShowOverlay } = useContext(SortContext);
  const [isHovered, setIsHovered] = useState(false);

  const onButtonClicked = () => {
    setShowOverlay(!showOverlay);
  };

  return (
    <div
      className='relative flex flex-col items-start'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        className={`bg-background border-solid border-2 border-primary-dark rounded-xl
        [transition:_background-color_0.1s,transform_0.1s_ease-out] cursor-pointer outline-none
        hover:rotate-[45deg]
        ${showOverlay && "bg-primary"}`}
        onClick={onButtonClicked}
      >
        <img
          src={`/images/icons/sort${sortParams.direction}.svg`}
          alt='sort icon'
          className={`w-8 p-1 filter-primary-dark ${
            showOverlay && "filter-white"
          }`}
        />
      </button>
      {showOverlay && <SortButtonOverlay />}
      <SmallTooltip
        text='Sort'
        shouldRender={isHovered && !showOverlay}
        topOffset={42}
        leftOffset={0}
        renderDelay={1000}
      />
    </div>
  );
};

export default SortButton;
