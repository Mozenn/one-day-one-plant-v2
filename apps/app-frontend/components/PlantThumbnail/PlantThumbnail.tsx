import { useRouter } from "next/router";
import { Plant } from "../../types/plant";

const PlantThumbnail = ({ plantData }: { plantData: Plant }) => {
  const router = useRouter();

  const onClick = () => {
    router.push(`/plant/${plantData?.id}`);
  };
  return (
    <div
      className='flex flex-col items-start cursor-pointer w-72 border-2 border-solid border-primary-dark rounded-3xl p-2'
      data-testid='container'
      onClick={onClick}
    >
      <h3 className='text-xl font-semibold m-1'>{plantData.name}</h3>
      <div className='text-base'>
        <label className='mr-2'>Scientific Name :</label>
        <label>{plantData.scientificName}</label>
      </div>
      <div className='text-base'>
        <label className='mr-2'>Family :</label>
        <label>{plantData.family}</label>
      </div>
    </div>
  );
};

export default PlantThumbnail;
