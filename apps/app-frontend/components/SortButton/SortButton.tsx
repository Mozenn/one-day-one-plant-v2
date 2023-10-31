import styles from "./SortButton.module.scss";
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
      className={styles.container}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        className={`${styles.button} ${showOverlay && styles.active}`}
        onClick={onButtonClicked}
      >
        <img
          src={`/images/icons/sort${sortParams.direction}.svg`}
          alt='sort icon'
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
