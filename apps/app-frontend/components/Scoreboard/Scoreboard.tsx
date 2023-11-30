"use client";

import { User } from "@/types/user";
import Table, { TableColumn, TableData } from "./Table/Table";
import useAuth from "@/hooks/useAuth";

export type ScoreboardData = {
  tableData: TableData<User>;
  elementsPerPage: number;
  initialSortKey: string;
};

const Scoreboard = () => {
  const { authId } = useAuth();
  const tableData = {
    tableElementType: "default",
    fetchUrl: "/user/page",
    additionalElementStyles: (row: User) => {
      return row.id === authId ? "text-secondary" : "";
    },
  };

  const columns: TableColumn<User>[] = [
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
