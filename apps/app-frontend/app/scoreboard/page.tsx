import AuthGuard from "@/components/Auth/AuthGuard";
import Scoreboard, { ScoreboardData } from "@/components/Scoreboard/Scoreboard";
import FilterProvider from "@/contexts/filterContext";
import PaginationProvider from "@/contexts/paginationContext";
import SortProvider from "@/contexts/sortContext";

const ScoreboardPage = () => {
  const elementsPerPage = 5;
  const initialSortKey = "username";

  return (
    <AuthGuard>
      <main
        className="flex flex-col items-center flex-1 m-0 min-h-[80vh] py-20 px-0"
        role="main"
      >
        <h1
          className="text-primary-dark text-4xl p-4 rounded-full font-bold"
          role="heading"
        >
          Scoreboard
        </h1>
        <PaginationProvider elementsPerPage={elementsPerPage}>
          <SortProvider initialKey={initialSortKey}>
            <FilterProvider>
              <Scoreboard />
            </FilterProvider>
          </SortProvider>
        </PaginationProvider>
      </main>
    </AuthGuard>
  );
};

export default ScoreboardPage;
