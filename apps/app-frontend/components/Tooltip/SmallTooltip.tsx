import styles from "./SmallTooltip.module.scss";
import BaseTooltip from "./BaseTooltip";

const SmallTooltip = ({
  text = "",
  shouldRender,
  topOffset = 0,
  leftOffset = 0,
  renderDelay = -1,
}: {
  text: string;
  shouldRender: boolean;
  topOffset: number;
  leftOffset: number;
  renderDelay?: number;
}) => {
  return (
    <BaseTooltip
      text={text}
      shouldRender={shouldRender}
      topOffset={topOffset}
      leftOffset={leftOffset}
      stylesOverride={styles}
      renderDelay={renderDelay}
    />
  );
};

export default SmallTooltip;
