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
        className={`${styles.button} ${showOverlay && styles.active}`}
        onClick={onButtonClicked}
      >
        <img src='/images/icons/filter.svg' alt='filter icon' />
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
