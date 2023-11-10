"use client";

import styles from "./Table.module.scss";
import { useContext } from "react";
import TableContent from "./TableContent";
import Pagination from "../../Pagination/Pagination";
import TableHead from "./TableHead";
import { FilterContext } from "../../../contexts/filterContext";
import { TableRow } from "@/types/tableRow";

export type OnElementSelected<T> = (element: T) => void;

export type TableData<T> = {
  tableElementType: string;
  fetchUrl: string;
  onElementSelected?: OnElementSelected<T>;
};

export type TableColumn<T> = {
  name: string;
  propertyName: string;
  type: string;
  getLink?: (row: T) => string;
};

const Table = <T extends TableRow>({
  columns,
  tableData = { tableElementType: "default", fetchUrl: "/fetch/url" },
}: {
  columns: TableColumn<T>[];
  tableData: TableData<T>;
}) => {
  const { showOverlay, setShowOverlay } = useContext(FilterContext);

  return (
    <div className='flex flex-col items-center mt-16 min-h-[88vh]'>
      <div className='flex items-start'>
        <button
          className={`flex items-center border-2 border-solid border-primary-dark 
          rounded-xl bg-background outline-none cursor-pointer 
          transition-transform duration-500 mr-8 mt-8 hover:rotate-45
          ${showOverlay && "bg-primary"}`}
          onClick={() => setShowOverlay(!showOverlay)}
          data-testid='filter-button'
        >
          <img
            src='/images/icons/filter.svg'
            alt='filter button icon'
            className={`filter-primary-dark p-[12%] h-8 ${
              showOverlay && "filter-white"
            }`}
          />
        </button>
        <table className={styles.table}>
          <TableHead columns={columns} />
          <TableContent columns={columns} tableData={tableData} />
        </table>
      </div>
      <Pagination />
    </div>
  );
};

export default Table;
