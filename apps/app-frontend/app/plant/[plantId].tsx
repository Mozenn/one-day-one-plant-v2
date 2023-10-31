import { GetServerSidePropsContext } from "next";
import useFetch from "../../hooks/useFetch";
import { Plant } from "@/types/plant";
import Spinner from "@/components/Spinner/Spinner";
import Link from "next/link";
import styles from "../../../styles/Plant.module.scss";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: { plantId: context.params?.plantId },
  };
}

const PlantPage = ({ plantId }: { plantId: string }) => {
  const { data: plant, error } = useFetch<Plant>({
    url: `/api/plant`,
    params: {
      id: plantId,
    },
  });

  return (
    <>
      {!plant ? (
        <Spinner />
      ) : (
        <main className='flex flex-col min-h-[88vh] py-0 px-20'>
          <div>
            <img src={plant.imageUrl} alt={`A picture of a ${plant.name}`} />
          </div>
          <div>
            <div className='flex items-center'>
              <h2 className='text-2xl mr-8'>{plant.name}</h2>
            </div>
          </div>

          <div className='flex flex-col'>
            <div className='flex flex-col p-4 w-[23%] [&>*]:mb-4 last:mb-0'>
              <div className={styles.field}>
                <label>Scientific name :</label>
                <label>{plant.scientificName}</label>
              </div>
              <div className={styles.field}>
                <label>Family :</label>
                <label>{plant.family}</label>
              </div>
            </div>
            <div>
              {plant.urls.map((url) => {
                return (
                  <Link href={url.url} passHref key={url.label}>
                    <button className='globalButton'>{url.label}</button>
                  </Link>
                );
              })}
            </div>
          </div>
        </main>
      )}
    </>
  );
};

export default PlantPage;
