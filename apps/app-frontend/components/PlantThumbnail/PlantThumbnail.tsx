import { useRouter } from "next/navigation";
import { Plant } from "../../types/plant";

const PlantThumbnail = ({ plantData }: { plantData: Plant }) => {
  const router = useRouter();

  const onClick = () => {
    router.push(`/plant/${plantData?.id}`);
  };
  return (
    <div
      className='flex flex-col items-start cursor-pointer w-80 h-48 border-4 border-solid border-secondary-dark rounded-3xl p-2
      bg-no-repeat bg-center bg-cover 
      shadow-plant-thumbnail text-white
      transition-transform hover:scale-110 duration-200
      [&_*]:cursor-[inherit] [&_label]:text-lg [&_label]:font-extrabold
      '
      style={{
        backgroundImage: `url(${plantData.imageUrl})`,
        WebkitTextStrokeColor: "var(--color-secondary-dark)",
        WebkitTextStrokeWidth: "0.8px",
      }}
      data-testid='container'
      onClick={onClick}
    >
      <h3 className='text-2xl font-black m-1 stroke-gray-500'>
        {plantData.name}
      </h3>
      <div>
        <label className='mr-2'>Scientific Name :</label>
        <label>{plantData.scientificName}</label>
      </div>
      <div>
        <label className='mr-2'>Family :</label>
        <label>{plantData.family}</label>
      </div>
    </div>
  );
};

export default PlantThumbnail;
