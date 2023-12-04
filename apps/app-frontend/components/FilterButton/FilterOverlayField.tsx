import styles from "./FilterOverlayField.module.scss";
import { FilterContext } from "../../contexts/filterContext";
import { useContext } from "react";

const FilterOverlayField = ({
  label,
  filterId,
}: {
  label: string;
  filterId: string;
}) => {
  const { getFilter, setFilter } = useContext(FilterContext);

  return (
    <div className={styles.container}>
      <label>{`${label}:`}</label>
      <input
        className='px-2'
        placeholder='...'
        value={getFilter(filterId) || ""}
        onChange={(event) => setFilter(filterId, event.target.value)}
      ></input>
    </div>
  );
};

export default FilterOverlayField;
