import { useContext } from "react";
import { FilterContext } from "../../contexts/filterContext";
import FilterOverlayField from "./FilterOverlayField";
import FilterOverlayDateField from "./FilterOverlayDateField";
import ResetButton from "../ResetButton/ResetButton";

const FilterButtonOverlay = () => {
  const { filtersOnOverlay, resetFilters } = useContext(FilterContext);

  return (
    <div
      role="overlay"
      className="relative top-3 flex flex-col p-4 bg-white border-2 border-solid border-primary-dark text-primary-dark rounded-3xl last:mb-0"
    >
      <ResetButton reset={resetFilters} />
      {filtersOnOverlay.map((field: any) => {
        switch (field.type) {
          case "field":
            return (
              <FilterOverlayField
                key={field.filterId}
                label={field.label}
                filterId={field.filterId}
              />
            );
          case "dateField":
            return (
              <FilterOverlayDateField
                key={field.filterIdStartDate.concat(field.filterIdEndDate)}
                label={field.label}
                filterIdStartDate={field.filterIdStartDate}
                filterIdEndDate={field.filterIdEndDate}
              />
            );
        }
      })}
    </div>
  );
};

export default FilterButtonOverlay;
