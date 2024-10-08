import PaginationProvider from "../../../contexts/paginationContext";
import FilterProvider from "../../../contexts/filterContext";
import SortProvider from "../../../contexts/sortContext";
import Panel, { PanelInputs } from "../../Panel/Panel";
import PlantThumbnail from "@/components/PlantThumbnail/PlantThumbnail";
import { Plant } from "@/types/plant";
import useAuth from "@/hooks/useAuth";

const Collection = () => {
  const { authId } = useAuth();

  const postInitialFilters = [
    {
      filterId: "name",
      label: "name",
      type: "field",
    },
    {
      filterId: "scientificName",
      label: "scientific name",
      type: "field",
    },
    {
      filterId: "family",
      label: "family",
      type: "field",
    },
    {
      filterIdStartDate: "startDate",
      filterIdEndDate: "endDate",
      label: "date",
      type: "dateField",
    },
  ];

  const plantsPanelInputs: PanelInputs<Plant> = {
    fetchItem: {
      fetchUrl: "/plant/page",
      extraParams: {
        userId: authId,
      },
    },
    renderItem: (itemData: Plant) => (
      <PlantThumbnail key={itemData.id} plantData={itemData} />
    ),
    gridSizeOverwrite: 20,
  };

  return (
    <div className="flex flex-col items-center min-h-[60vh] w-full">
      <h2
        className="text-primary-dark text-4xl p-4 rounded-full font-bold"
        role="heading"
      >
        Collection
      </h2>
      <PaginationProvider elementsPerPage={8}>
        <FilterProvider initialFiltersOnOverlay={postInitialFilters}>
          <SortProvider initialKey="name">
            <Panel panelInputs={plantsPanelInputs} />
          </SortProvider>
        </FilterProvider>
      </PaginationProvider>
    </div>
  );
};

export default Collection;
