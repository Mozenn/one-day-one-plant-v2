import { Plant } from "@/types/plant";

const ProfilePictureSelectionThumbnail = ({
  plantData,
  onSelected,
}: {
  plantData: Plant;
  onSelected: (plantId: number) => void;
}) => {
  return (
    <div
      className="shadow-[0_0px_8px_0px_rgba(0,0,0,0.6)] w-24 h-24 rounded-3xl m-2
    text-white cursor-pointer 
      transition-transform hover:scale-110 duration-200
      [&_*]:cursor-[inherit] [&_label]:text-lg [&_label]:font-extrabold
    "
    >
      <div
        className="flex flex-col items-start 
        w-full h-full rounded-3xl p-2
      bg-no-repeat bg-center bg-cover 
      "
        style={{
          backgroundImage: `url(${plantData.imageUrl})`,
        }}
        data-testid="container"
        onClick={() => onSelected(plantData.id)}
      ></div>
    </div>
  );
};

export default ProfilePictureSelectionThumbnail;
