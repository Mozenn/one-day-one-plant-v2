"use client";

import { Member } from "@/types/member";
import Table, { TableColumn, TableData } from "./Table/Table";
import useAuth from "@/hooks/useAuth";

export type ScoreboardData = {
  tableData: TableData<Member>;
  elementsPerPage: number;
  initialSortKey: string;
};

const Scoreboard = () => {
  const { authId } = useAuth();
  const tableData = {
    tableElementType: "default",
    fetchUrl: "/member/page",
    additionalElementStyles: (row: Member) => {
      return row.id === authId ? "text-secondary" : "";
    },
  };

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
