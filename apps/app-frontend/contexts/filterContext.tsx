"use client";

import { createContext, useState } from "react";

export const FilterContext = createContext<any>({});

const FilterProvider = ({
  children,
  initialFiltersOnOverlay = [],
}: {
  children: any;
  initialFiltersOnOverlay?: any[];
}) => {
  const [filterParams, setFilterParams] = useState<any>({});
  const [filtersOnOverlay, setFiltersOnOverlay] = useState(
    initialFiltersOnOverlay
  );
  const [showOverlay, setShowOverlay] = useState(false);
  const [filtersInitialized, setFilterInitialized] = useState(false);

  const initializeFilters = (filters: any) => {
    if (!filtersInitialized) {
      setFilters(filters);
      setFilterInitialized(true);
    }
  };

  const setFilter = (filterName: string, filterValue: any) => {
    setFilterParams((prevFilters: any) => ({
      ...prevFilters,
      [filterName]: filterValue,
    }));
  };

  const setFilters = (filters: any) => {
    setFilterParams(filters);
  };

  const getFilter = (filterName: string) => {
    return filterParams[filterName];
  };

  const resetFilters = () => {
    setFilters({});
  };

  const value = {
    filterParams,
    filtersOnOverlay,
    setFiltersOnOverlay,
    getFilter,
    setFilter,
    setFilters,
    showOverlay,
    setShowOverlay,
    initializeFilters,
    resetFilters,
  };

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
};

export default FilterProvider;
