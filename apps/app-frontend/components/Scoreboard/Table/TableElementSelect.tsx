import { OnElementSelected, TableColumn } from "./Table";
import { TableRow } from "@/types/tableRow";

const TableElementSelect = <T extends TableRow>({
  columns,
  row,
  isLast,
  onElementSelected,
}: {
  columns: TableColumn<T>[];
  row: T;
  isLast: boolean;
  onElementSelected: OnElementSelected<T>;
}) => {
  const renderColumn = (column: TableColumn<T>) => {
    switch (column.type) {
      case "text":
        return (
          <td key={column.name.concat(row.id.toString())}>
            {row[column.propertyName as keyof TableRow]}
          </td>
        );

      default:
        return null;
    }
  };

  return (
    <tr
      className={`text-center mt-8 cursor-pointer transition-colors hover:bg-primary-light ${
        isLast && "hover:border-b-0 hover:rounded-bl-2xl hover:rounded-br-2xl"
      }`}
      onClick={() => onElementSelected(row)}
    >
      {columns.map((column) => {
        return renderColumn(column);
      })}
    </tr>
  );
};

export default TableElementSelect;
