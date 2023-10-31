import styles from "./SortButtonOverlay.module.scss";
import { useContext } from "react";
import { SortContext } from "../../contexts/sortContext";
import ResetButton from "../ResetButton/ResetButton";

const SortButtonOverlay = () => {
  const { sortParams, setDirection, setKeyToSortBy, resetSort } =
    useContext(SortContext);

  return (
    <div className={styles.container}>
      <ResetButton reset={resetSort} />
      <div className={styles.directionContainer}>
        <label>direction:</label>
        <div className={styles.buttonContainer}>
          <button
            className={`${styles.button} ${
              sortParams.direction === "asc" && styles.active
            }`}
            onClick={() => setDirection("asc")}
          >
            ASC
          </button>
          <button
            className={`${styles.button} ${
              sortParams.direction === "dsc" && styles.active
            }`}
            onClick={() => setDirection("dsc")}
          >
            DSC
          </button>
        </div>
      </div>
      <div className={styles.elementContainer}>
        <label>element:</label>
        <select
          className={styles.select}
          value={sortParams.key}
          onChange={(event) => setKeyToSortBy(event.target.value)}
        >
          <option className={styles.option} value='createdAt'>
            date
          </option>
          <option className={styles.option} value='name'>
            name
          </option>
        </select>
      </div>
    </div>
  );
};

export default SortButtonOverlay;
