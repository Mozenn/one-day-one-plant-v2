"use client";

import { createContext, useState } from "react";
import { clamp } from "../lib/mathUtils";

export const PaginationContext = createContext<any>({});

const PaginationProvider = ({
  children,
  elementsPerPage = 5,
}: {
  children: any;
  elementsPerPage?: number;
}) => {
  const [page, setPage] = useState(1);
  const [elementsPerPageState, setElementsPerPage] = useState(elementsPerPage);
  const [elementCount, setElementCount] = useState(1);

  const goToFirstPage = () => setPage(1);

  const goToLastPage = () => setPage(getLastPage());

  const goToPage = (page: number) => {
    setPage((prevPage: number) => {
      if (prevPage === page) {
        return prevPage;
      }

      const newPage = clamp(page, 1, getLastPage());
      setPage(newPage);
      return newPage;
    });
  };

  const incrementPage = () => page < getLastPage() && setPage(page + 1);

  const decrementPage = () => page > 1 && setPage(page - 1);

  const atFirstPage = () => page === 1;

  const atLastPage = () => page === getLastPage();

  const getLastPage = () => Math.ceil(elementCount / elementsPerPageState);

  const value = {
    page,
    elementsPerPage: elementsPerPageState,
    elementCount,
    goToFirstPage,
    goToLastPage,
    goToPage,
    incrementPage,
    decrementPage,
    atFirstPage,
    atLastPage,
    setElementCount,
    setElementsPerPage,
  };

  return (
    <PaginationContext.Provider value={value}>
      {children}
    </PaginationContext.Provider>
  );
};

export default PaginationProvider;
