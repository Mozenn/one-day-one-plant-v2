import { useContext } from "react";
import { SortContext } from "../../contexts/sortContext";
import ResetButton from "../ResetButton/ResetButton";
import SortButtonOverlayButton from "./SortButtonOverlayButton";

const SortButtonOverlay = () => {
  const { sortParams, setDirection, setKeyToSortBy, resetSort } =
    useContext(SortContext);
  //[&>*:nth-child(1)]:
  return (
    <div
      className="relative top-3 flex flex-col p-4 bg-white border-2 border-solid border-primary-dark
    text-primary-dark rounded-3xl z-10
    "
    >
      <ResetButton reset={resetSort} />
      <div className="flex m-4">
        <label>direction:</label>
        <div
          className="flex content-center justify-center mb-3 border-2 border-solid border-primary-dark rounded-xl
        "
        >
          <SortButtonOverlayButton
            label={"ASC"}
            direction={sortParams.direction}
            currentDirection="asc"
            additionalStyles="rounded-l-lg"
            onButtonClick={() => setDirection("asc")}
          />
          <SortButtonOverlayButton
            label={"DESC"}
            currentDirection="desc"
            direction={sortParams.direction}
            additionalStyles="rounded-r-lg"
            onButtonClick={() => setDirection("desc")}
          />
        </div>
      </div>
      <div className="flex">
        <label className="mr-3">element:</label>
        <select
          className="text-base bg-background border-2 border-solid border-primary-dark rounded-xl text-secondary-dark
          outline-none
          "
          value={sortParams.key}
          onChange={(event) => setKeyToSortBy(event.target.value)}
        >
          <option className="hover:bg-primary" value="createdAt">
            date
          </option>
          <option className="hover:bg-primary" value="name">
            name
          </option>
        </select>
      </div>
    </div>
  );
};

export default SortButtonOverlay;
