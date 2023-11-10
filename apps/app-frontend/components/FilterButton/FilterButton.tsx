import { useContext, useState } from "react";
import styles from "./FilterButton.module.scss";
import FilterButtonOverlay from "./FilterButtonOverlay";
import { FilterContext } from "../../contexts/filterContext";
import SmallTooltip from "../Tooltip/SmallTooltip";

const FilterButton = () => {
  const { showOverlay, setShowOverlay } = useContext(FilterContext);
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
        className={` bg-background border-2 border-solid border-primary-dark rounded-xl 
        transition-[colors_0.2s,transform_0.5s] duration-100 cursor-pointer outline-none
        hover:rotate-[35deg]
        ${showOverlay && "bg-primary transition-[colors_0.2s,transform_0.5s]"}`}
        onClick={onButtonClicked}
      >
        <img
          src='/images/icons/filter.svg'
          alt='filter icon'
          className={`w-8 p-1 filter-primary-dark ${
            showOverlay && "filter-white"
          }`}
        />
      </button>
      {showOverlay && <FilterButtonOverlay />}
      <SmallTooltip
        text='Filter'
        shouldRender={isHovered && !showOverlay}
        topOffset={42}
        leftOffset={0}
        renderDelay={1000}
      />
    </div>
  );
};

export default FilterButton;
