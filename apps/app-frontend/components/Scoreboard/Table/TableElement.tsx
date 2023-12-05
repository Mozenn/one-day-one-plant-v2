import Link from "next/link";
import { TableColumn } from "./Table";
import { TableRow } from "@/types/tableRow";

const TableElement = <T extends TableRow>({
  columns,
  row,
  additionalStyles,
}: {
  columns: TableColumn<T>[];
  row: T;
  additionalStyles?: string;
}) => {
  const renderColumn = (column: TableColumn<T>, isLink = false) => {
    switch (column.type) {
      case "text":
        return (
          <td
            key={column.name.concat(row.id.toString())}
            className={`text-lg font-semibold ${
              isLink
                ? "cursor-pointer underline transition-colors duration-200 hover:text-primary"
                : ""
            } ${additionalStyles}`}
          >
            {row[column.propertyName as keyof TableRow]}
          </td>
        );

      default:
        return null;
    }
  };

  return (
    <tr className="text-center mt-8">
      {columns.map((column) => {
        return column.getLink ? (
          <Link
            key={column.name.concat(row.id.toString()).concat("link")}
            href={column.getLink(row)}
          >
            {renderColumn(column, true)}
          </Link>
        ) : (
          renderColumn(column)
        );
      })}
    </tr>
  );
};

export default TableElement;
