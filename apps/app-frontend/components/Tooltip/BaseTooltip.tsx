import { useEffect, useState } from "react";
import styles from "./BaseTooltip.module.scss";

type Styles = {
  readonly [key: string]: string;
};

export enum RenderState {
  Hidden = 1,
  WaitingRender,
  Visible,
}

const BaseTooltip = ({
  text = "",
  shouldRender,
  topOffset = 0,
  leftOffset = 0,
  renderDelay = -1,
  stylesOverride,
}: {
  text: string;
  shouldRender: boolean;
  topOffset: number;
  leftOffset: number;
  renderDelay: number;
  stylesOverride?: Styles;
}) => {
  const [renderState, setRenderState] = useState(RenderState.Hidden);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (renderState === RenderState.Hidden && shouldRender) {
      if (renderDelay > 0) {
        setRenderState(RenderState.WaitingRender);
        const newTimer = setTimeout(
          () => setRenderState(RenderState.Visible),
          renderDelay
        );
        setTimer(newTimer);
      } else {
        setRenderState(RenderState.Visible);
      }
    } else if (
      (renderState === RenderState.Visible ||
        renderState === RenderState.WaitingRender) &&
      !shouldRender
    ) {
      setRenderState(RenderState.Hidden);
      if (timer) {
        clearTimeout(timer);
        setTimer(null);
      }
    }
  }, [shouldRender, renderState, timer, renderDelay]);

  const doesOverrideTooltipStyle = () => {
    return stylesOverride && stylesOverride["tooltip"];
  };

  return (
    <div
      className={`${
        doesOverrideTooltipStyle() ? stylesOverride!.tooltip : styles.tooltip
      } ${renderState === RenderState.Visible && "z-[1] opacity-100"}
        top-[${topOffset}px] left-[${leftOffset}px]
      `}
      data-testid='tooltip'
    >
      <p>{text}</p>
    </div>
  );
};

export default BaseTooltip;
