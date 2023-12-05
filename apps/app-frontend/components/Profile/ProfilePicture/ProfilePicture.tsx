import { User } from "@/types/user";
import { getGradeFromScore } from "../../../lib/gradeUtils";
import { useState } from "react";

const ProfilePicture = ({ user }: { user: User }) => {
  const [isHoveringPicture, setIsHoveringPicture] = useState(false);
  const [isImageSelectionVisible, setImageSelectionVisible] = useState(false);

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
      style={{
        backgroundImage: `url(${user.profilePlantUrl})`,
        borderColor: `var(--color-grade-${getGradeFromScore(user.score)})`,
      }}
    >
      {isHoveringPicture && (
        <button
          className={`bg-secondary-passthrough hover:bg-secondary transition-colors duration-200
          p-3 hover:cursor-pointer rounded-3xl `}
        >
          <img
            src={"/images/icons/edit.svg"}
            alt="Edit Profile Image"
            className="filter-white w-12 "
          />
        </button>
      )}
    </div>
  );
};

export default ProfilePicture;
