"use client";

import { createContext, useState } from "react";

export const SortContext = createContext<any>({});

const SortProvider = ({
  children,
  initialDirection = "asc",
  initialKey = "createdAt",
}: {
  children: any;
  initialDirection?: string;
  initialKey?: string;
}) => {
  const [sortParams, setSortParams] = useState({
    direction: initialDirection,
    key: initialKey,
  });
  const [showOverlay, setShowOverlay] = useState(false);

  const setDirection = (newDirection: string) => {
    setSortParams((prevValue) => ({ ...prevValue, direction: newDirection }));
  };

  const setKeyToSortBy = (newKey: string) => {
    setSortParams((prevValue) => ({ ...prevValue, key: newKey }));
  };

  const resetSort = () => {
    setDirection(initialDirection);
    setKeyToSortBy(initialKey);
  };

  const value = {
    sortParams,
    setSortParams,
    setDirection,
    setKeyToSortBy,
    showOverlay,
    setShowOverlay,
    resetSort,
  };

  return <SortContext.Provider value={value}>{children}</SortContext.Provider>;
};

export default SortProvider;
