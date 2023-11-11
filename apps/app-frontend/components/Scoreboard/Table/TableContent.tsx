import { useContext, useEffect } from "react";
import { PaginationContext } from "../../../contexts/paginationContext";
import { SortContext } from "../../../contexts/sortContext";
import { FilterContext } from "../../../contexts/filterContext";
import useFetch from "../../../hooks/useFetch";
import TableElement from "./TableElement";
import Spinner from "../../Spinner/Spinner";
import { Page } from "../../../types/page";
import { TableColumn, TableData } from "./Table";
import TableElementSelect from "./TableElementSelect";
import { TableRow } from "@/types/tableRow";

const TableContent = <T extends TableRow>({
  columns,
  tableData,
}: {
  columns: TableColumn<T>[];
  tableData: TableData<T>;
}) => {
  const { page, elementsPerPage, elementCount, setElementCount } =
    useContext(PaginationContext);
  const { sortParams } = useContext(SortContext);
  const { filterParams } = useContext(FilterContext);

  const { data, error } = useFetch<Page<T>>({
    url: tableData.fetchUrl,
    params: {
      ...sortParams,
      ...filterParams,
      page: page - 1,
      elementsPerPage: elementsPerPage,
    },
  });

  const renderTableElement = (
    row: T,
    columns: TableColumn<T>[],
    isLast: boolean
  ) => {
    return tableData.tableElementType === "select" &&
      tableData.onElementSelected ? (
      <TableElementSelect
        key={row[idProperty]}
        columns={columns}
        row={row}
        isLast={isLast}
        onElementSelected={tableData.onElementSelected}
      />
    ) : (
      <TableElement
        key={row[`${idProperty}`]}
        columns={columns}
        row={row}
        additionalStyles={
          tableData.additionalElementStyles &&
          tableData.additionalElementStyles(row)
        }
      />
    );
  };

  const idProperty = "id";

  useEffect(() => {
    if (data?.total && data.total != elementCount) {
      setElementCount(data.total);
    }
  }, [data, elementCount, setElementCount]);

  if (!data) {
    return <Spinner styleOverride='ml-[50%]' />;
  }

  return (
    <tbody>
      {data.content && data.total ? (
        data.content.map((row, index) =>
          renderTableElement(row, columns, index === data.content.length - 1)
        )
      ) : (
        <tr className='min-h-[3vh] block' />
      )}
    </tbody>
  );
};

export default TableContent;
