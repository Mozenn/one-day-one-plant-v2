import { Member } from "@/types/member";
import Table, { TableColumn, TableData } from "./Table/Table";

export type ScoreboardData = {
  tableData: TableData<Member>;
  elementsPerPage: number;
  initialSortKey: string;
};

const Scoreboard = ({ tableData }: { tableData: TableData<Member> }) => {
  const columns: TableColumn<Member>[] = [
    {
      name: "Username",
      propertyName: "username",
      type: "text",
    },
    {
      name: "Score",
      propertyName: "score",
      type: "text",
    },
  ];

  return <Table tableData={tableData} columns={columns} />;
};

export default Scoreboard;
