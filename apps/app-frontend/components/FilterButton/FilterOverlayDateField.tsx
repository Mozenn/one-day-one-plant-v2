import styles from "./FilterOverlayDateField.module.scss";
import { FilterContext } from "../../contexts/filterContext";
import DatePicker from "react-datepicker";
import { useContext } from "react";

const FilterOverlayDateField = ({
  label,
  filterIdStartDate,
  filterIdEndDate,
}: {
  label: string;
  filterIdStartDate: string;
  filterIdEndDate: string;
}) => {
  const { getFilter, setFilter } = useContext(FilterContext);

  return (
    <div className={styles.dateContainer}>
      <label>{`${label}:`}</label>
      <DatePicker
        selected={getFilter(filterIdStartDate)}
        onChange={(date: Date) => {
          const newDate = date ? date.getTime() : undefined;
          setFilter(filterIdStartDate, newDate);
        }}
      />
      <label> - </label>
      <DatePicker
        selected={getFilter(filterIdEndDate)}
        onChange={(date: Date) => {
          const newDate = date ? date.getTime() : undefined;
          setFilter(filterIdEndDate, newDate);
        }}
      />
    </div>
  );
};

export default FilterOverlayDateField;
