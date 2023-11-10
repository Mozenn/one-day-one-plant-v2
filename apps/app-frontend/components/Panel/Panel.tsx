"use client";

import { ReactElement, useEffect } from "react";
import { SortContext } from "../../contexts/sortContext";
import { FilterContext } from "../../contexts/filterContext";
import { useContext } from "react";
import useFetch, { FetchItem } from "../../hooks/useFetch";
import Pagination from "../Pagination/Pagination";
import { PaginationContext } from "../../contexts/paginationContext";
import { Page } from "../../types/page";
import SortButton from "../SortButton/SortButton";
import FilterButton from "../FilterButton/FilterButton";
import NoContent from "../NoContent/NoContent";

type ExtraParams = {
  [key: string]: any;
};

export type PanelFetchItem<T> = {
  fetchUrl: string;
  extraParams?: ExtraParams;
};

export type PanelInputs<T> = {
  fetchItem: PanelFetchItem<T>;
  renderItem: (itemData: T) => ReactElement;
  gridSizeOverwrite?: number | undefined;
};

const Panel = <T extends unknown>({
  panelInputs,
}: {
  panelInputs: PanelInputs<T>;
}) => {
  const { page, elementsPerPage, elementCount, setElementCount } =
    useContext(PaginationContext);
  const { sortParams } = useContext(SortContext);
  const { filterParams } = useContext(FilterContext);

  const adaptFetchItems = (fetchItem: PanelFetchItem<T>): FetchItem => {
    return {
      url: fetchItem.fetchUrl,
      params: {
        ...sortParams,
        ...filterParams,
        page: page - 1,
        elementsPerPage: elementsPerPage,
        ...fetchItem.extraParams,
      },
    };
  };

  const { data, error } = useFetch<Page<T>>(
    adaptFetchItems(panelInputs.fetchItem)
  );

  useEffect(() => {
    if (data && "total" in data && data.total != elementCount) {
      setElementCount(data.total);
    }
  }, [data, elementCount, setElementCount]);

  useEffect(() => {
    console.log("effect pagep", page);
  }, [page]);

  const anyContentToRender = () => {
    return !(!data || !data.content || elementCount <= 0);
  };

  const getGridTemplateColumns = (
    gridSizeOverwrite: number | undefined
  ): string => {
    const gridSize = gridSizeOverwrite ? gridSizeOverwrite : 10;

    return `repeat(auto-fill, minmax(${gridSize}rem, 1fr))`;
  };

  return (
    <div className='flex flex-col items-center justify-center py-0 px-8 w-full'>
      <div className='self-start w-full flex items-start content-between mt-8 [&>*]:mr-8'>
        <SortButton />
        <FilterButton />
      </div>

      {anyContentToRender() ? (
        <>
          <div
            style={{
              gridTemplateColumns: getGridTemplateColumns(
                panelInputs.gridSizeOverwrite
              ),
            }}
            className='grid w-full my-8 justify-center items-center gap-8'
            data-testid='items-container'
          >
            {data?.content.map((item) => {
              return panelInputs.renderItem(item);
            })}
          </div>
          <div className='mb-8' data-testid='pagination-container'>
            <Pagination />
          </div>
        </>
      ) : (
        <NoContent />
      )}
    </div>
  );
};

export default Panel;
