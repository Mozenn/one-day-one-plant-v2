import { useRouter } from "next/navigation";
import { Plant } from "../../types/plant";
import { capitalize } from "@/lib/stringUtils";

const PlantThumbnail = ({ plantData }: { plantData: Plant }) => {
  const router = useRouter();

  const onClick = () => {
    router.push(`/plant/${plantData?.id}`);
  };
  return (
    <div
      className="shadow-[0_0px_12px_0px_rgba(0,0,0,0.6)] w-80 h-48 rounded-3xl
    text-white cursor-pointer 
      transition-transform hover:scale-110 duration-200
      [&_*]:cursor-[inherit] [&_label]:text-lg [&_label]:font-extrabold
    "
    >
      <div
        className="flex flex-col items-start 
        w-full h-full rounded-3xl p-2
      bg-no-repeat bg-center bg-cover 
      shadow-plant-thumbnail
      "
        style={{
          backgroundImage: `url(${plantData.imageUrl})`,
          WebkitTextStrokeColor: "var(--color-secondary-dark)",
          WebkitTextStrokeWidth: "0.8px",
        }}
        data-testid="container"
        onClick={onClick}
      >
        <h3 className="text-2xl font-black m-1 stroke-gray-500">
          {capitalize(plantData.name)}
        </h3>
        <div>
          <label className="mr-2">Scientific Name :</label>
          <label>{capitalize(plantData.scientificName)}</label>
        </div>
        <div>
          <label className="mr-2">Family :</label>
          <label>{capitalize(plantData.family)}</label>
        </div>
      </div>
    </div>
  );
};

export default PlantThumbnail;
