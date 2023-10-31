import { useState, useEffect } from "react";
import { millisecondsToTime, cooldownBetweenDraw } from "../../lib/timeUtils";

const Timer = ({ lastDrawDate }: { lastDrawDate: string }) => {
  const [remainingTime, setRemainingTime] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime(
        millisecondsToTime(
          cooldownBetweenDraw -
            (new Date().getTime() - new Date(lastDrawDate).getTime())
        )
      );
    }, 500);
    return () => clearInterval(interval);
  }, []);
  //box-shadow: 0px 2px 3px 1px rgb(124, 124, 124);
  return (
    <button className='text-2xl bg-primary text-white border-solid border-2 border-primary rounded-2xl p-4 my-[3vh] mx-0 shadow-xl'>
      {remainingTime}
    </button>
  );
};

export default Timer;
