import Scoreboard, { ScoreboardData } from "@/components/Scoreboard/Scoreboard";
import FilterProvider from "@/contexts/filterContext";
import PaginationProvider from "@/contexts/paginationContext";
import SortProvider from "@/contexts/sortContext";

const ScoreboardPage = () => {
  const scoreboardData: ScoreboardData = {
    tableData: {
      tableElementType: "default",
      fetchUrl: "/member/page",
    },
    elementsPerPage: 5,
    initialSortKey: "name",
  };

  return (
    <main
      className='flex flex-col items-center flex-1 m-0 min-h-[80vh] py-20 px-0'
      role='main'
    >
      <h1
        className='text-primary-dark text-4xl p-4 rounded-full'
        role='heading'
      >
        Scoreboard
      </h1>
      <PaginationProvider elementsPerPage={scoreboardData.elementsPerPage}>
        <SortProvider initialKey={scoreboardData.initialSortKey}>
          <FilterProvider>
            <Scoreboard tableData={scoreboardData.tableData} />
          </FilterProvider>
        </SortProvider>
      </PaginationProvider>
    </main>
  );
};

export default ScoreboardPage;
