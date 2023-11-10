import { useState, useEffect, useContext } from "react";
import { SortContext } from "../../../contexts/sortContext";
import { FilterContext } from "../../../contexts/filterContext";
import { PaginationContext } from "../../../contexts/paginationContext";
import { TableColumn } from "./Table";
import { TableRow } from "@/types/tableRow";

const TableHead = <T extends TableRow>({
  columns,
}: {
  columns: TableColumn<T>[];
}) => {
  const [activeSortColumnIndex, setActiveSortColumnIndex] = useState(0);
  const [columnSortStates, setColumnSortStates] = useState<any[]>([]);
  const [filterMapping, setFilterMapping] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { setDirection, setKeyToSortBy } = useContext(SortContext);
  const { getFilter, setFilter, initializeFilters, showOverlay } =
    useContext(FilterContext);
  const { goToFirstPage, atFirstPage } = useContext(PaginationContext);

  useEffect(() => {
    const initialFilterValues = columns.reduce(reducer, {});
    initializeFilters(initialFilterValues);
    setFilterMapping(Object.keys(initialFilterValues));

    const initialSortStates = Array(columns.length).fill("asc");
    setColumnSortStates(initialSortStates);

    setLoading(false);
  }, [columns, initializeFilters]);

  const reducer = (
    acc: any,
    { propertyName, type }: { propertyName: string; type: string }
  ) => {
    switch (type) {
      case "text":
        return { ...acc, [propertyName]: "" };
      default:
        return { ...acc, [propertyName]: "" };
    }
  };

  const setActiveColumn = (index: number) => {
    setKeyToSortBy(columns[index].propertyName);
    setActiveSortColumnIndex(index);
  };

  const toggleSortState = (index: number) => {
    let newDirection;

    const newValues = columnSortStates.map((loopState, loopIndex) => {
      let currentDirection = loopState;

      if (index === loopIndex) {
        currentDirection = loopState === "asc" ? "dsc" : "asc";
        newDirection = currentDirection;
      }

      return currentDirection;
    });

    setColumnSortStates(newValues);
    setActiveColumn(index);
    setDirection(newDirection);
  };

  const updateFilterValue = (index: number, value: string) => {
    if (!atFirstPage()) {
      goToFirstPage();
    }

    setFilter(filterMapping[index], value);
  };

  if (loading) {
    return null;
  }

  return (
    <thead>
      <tr>
        {columns.map((column, index) => {
          const isActiveSortColumn: boolean = index === activeSortColumnIndex;
          return (
            <th key={column.name}>
              <div className='flex items-center justify-center'>
                <button
                  onClick={() => setActiveColumn(index)}
                  className={`bg-transparent outline-none border-none cursor-pointer w-auto mr-4 
                  hover:[&>label]:text-primary-light
                  ${
                    isActiveSortColumn && "hover:[&>label]:text-secondary-light"
                  }`}
                >
                  <label
                    className={`text-primary-dark text-xl underline cursor-pointer
                  ${isActiveSortColumn && "text-secondary"}
                  `}
                  >
                    {column.name}
                  </label>
                </button>
                <button
                  className={`flex items-center border-2 border-solid border-primary-dark 
                  rounded-lg bg-background outline-none cursor-pointer ${
                    isActiveSortColumn && "text-secondary"
                  }`}
                  onClick={() => toggleSortState(index)}
                >
                  <img
                    src={`/images/icons/sort${columnSortStates[index]}.svg`}
                    alt='sort icon'
                    className={`h-auto w-7 filter-primary-dark p-[12%] ${
                      isActiveSortColumn && "filter-secondary"
                    }`}
                  />
                </button>
              </div>
            </th>
          );
        })}
      </tr>
      {showOverlay && (
        <tr>
          {columns.map((column, index) => {
            switch (column.type) {
              case "text":
                return (
                  <th
                    key={column.name + "filter"}
                    data-testid={`${column.propertyName}-filter`}
                  >
                    <input
                      value={getFilter(filterMapping[index])}
                      onChange={(e) => updateFilterValue(index, e.target.value)}
                      placeholder='...'
                      className='border-2 border-solid border-primary-dark rounded-2xl
                      text-center outline-none py-1 px-0 text-secondary-dark
                      '
                    ></input>
                  </th>
                );
              default:
                return null;
            }
          })}
        </tr>
      )}
    </thead>
  );
};

export default TableHead;
