import { User } from "@/types/user";
import { getGradeFromScore } from "../../../lib/gradeUtils";
import { useState } from "react";
import ProfilePictureSelection from "./ProfilePictureSelection";

const ProfilePicture = ({
  user,
  onNewPictureSelected,
}: {
  user: User;
  onNewPictureSelected: () => void;
}) => {
  const [isHoveringPicture, setIsHoveringPicture] = useState(false);
  const [isPictureSelectionVisible, setPictureSelectionVisible] =
    useState(false);

  return (
    <div
      onMouseEnter={() => setIsHoveringPicture(true)}
      onMouseLeave={() => setIsHoveringPicture(false)}
      className={`flex flex-col items-center justify-center 
      object-cover border-8 border-solid
      h-48 w-48 rounded-3xl p-2
          bg-no-repeat bg-center bg-cover 
          transition-shadow duration-200
          hover:shadow-plant-thumbnail
          -outline-offset-2 outline-4 outline-primary-dark outline`}
      data-testid="profile-picture"
      style={{
        backgroundImage: `url(${user.profilePlantUrl})`,
        borderColor: `var(--color-grade-${getGradeFromScore(user.score)})`,
      }}
    >
      {isHoveringPicture && (
        <button
          className={`bg-secondary-passthrough hover:bg-secondary transition-colors duration-200
          p-3 hover:cursor-pointer rounded-3xl `}
          data-testid="edit-profile-picture-button"
          onClick={() => setPictureSelectionVisible((pastValue) => !pastValue)}
        >
          <img
            src={`${
              isPictureSelectionVisible
                ? "/images/icons/x.svg"
                : "/images/icons/edit.svg"
            }`}
            alt={`${
              isPictureSelectionVisible
                ? "Close picture selection icon"
                : "Edit profile picture icon"
            }`}
            className="filter-white w-12 "
          />
        </button>
      )}
      {isPictureSelectionVisible && (
        <ProfilePictureSelection
          onNewPictureSelected={() => {
            setPictureSelectionVisible(false);
            onNewPictureSelected();
          }}
        />
      )}
    </div>
  );
};

export default ProfilePicture;
