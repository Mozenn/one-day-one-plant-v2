import NoContent from "@/components/NoContent/NoContent";
import Spinner from "@/components/Spinner/Spinner";
import useAuth from "@/hooks/useAuth";
import useInfiniteScrolling from "@/hooks/useInfiniteScrolling";
import { Plant } from "@/types/plant";
import ReactDOM from "react-dom";
import ProfilePictureSelectionThumbnail from "./ProfilePictureSelectionThumbnail";
import styles from "./ProfilePictureSelection.module.scss";
import { useRef } from "react";
import useLoader from "@/hooks/useLoader";

const ProfilePictureSelection = ({
  onNewPictureSelected,
}: {
  onNewPictureSelected: () => void;
}) => {
  const { isLoaded } = useLoader();
  const { authId, authFetch } = useAuth();
  const rootRef = useRef(null);

  const fetchParams = {
    elementsPerPage: 4,
    direction: "desc",
    key: "createdAt",
    userId: authId,
  };

  const [ref, plants, isLoading] = useInfiniteScrolling<Plant>({
    fetchUrl: "/plant/page",
    fetchParams,
    options: { root: rootRef.current },
  });

  if (!isLoaded) {
    return;
  }

  const onPlantSelected = async (plantId: number) => {
    const body = {
      plantId: plantId,
      userId: authId,
    };

    const response = await authFetch("/user", {
      method: "PUT",
      body: JSON.stringify(body),
    });

    response.status === 200 && onNewPictureSelected();
  };

  return ReactDOM.createPortal(
    <div
      className="absolute top-40 left-64 box-border w-96 h-72 bg-white text-primary-dark
    rounded-xl border-solid border-primary-dark shadow-[0_0px_10px_0px_rgba(0,0,0,0.4)]
    flex flex-col
    "
      ref={rootRef}
    >
      {plants.length > 0 ? (
        <div
          className={`flex flex-wrap p-2 overflow-scroll overflow-x-hidden justify-start items-center h-full w-full ${styles.commentsContainer}`}
        >
          {plants.map((plant) => (
            <ProfilePictureSelectionThumbnail
              key={plant.id}
              plantData={plant}
              onSelected={onPlantSelected}
            />
          ))}
          <div ref={ref} data-testid="spinner-row">
            {isLoading && <Spinner />}
          </div>
        </div>
      ) : (
        <>
          <NoContent />
          <div ref={ref} data-testid="spinner-row">
            {isLoading && <Spinner />}
          </div>
        </>
      )}
    </div>,
    document.querySelector<Element>("#__next")!,
  );
};

export default ProfilePictureSelection;
