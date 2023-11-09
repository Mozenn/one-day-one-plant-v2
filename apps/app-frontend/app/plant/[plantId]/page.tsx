"use client";

import useFetch from "../../../hooks/useFetch";
import { Plant } from "@/types/plant";
import Spinner from "@/components/Spinner/Spinner";
import Link from "next/link";
import styles from "../../../styles/Plant.module.scss";

const PlantPage = ({ params }: { params: { plantId: string } }) => {
  const { data: plant } = useFetch<Plant>({
    url: `/plant`,
    params: {
      id: params.plantId,
    },
  });

  return (
    <>
      {!plant ? (
        <Spinner />
      ) : (
        <main className='flex flex-col min-h-[88vh] py-0 px-20'>
          <div className='flex mt-8'>
            <img
              src={plant.imageUrl}
              alt={`A picture of a ${plant.name}`}
              className='rounded-2xl border-solid border-4 border-secondary w-[40rem]'
            />
            <div className='ml-14'>
              <h2 className='text-3xl font-bold mr-8 mb-4'>{plant.name}</h2>
              <div className={styles.field}>
                <label>Scientific name :</label>
                <label className='ml-2'>{plant.scientificName}</label>
              </div>
              <div className={styles.field}>
                <label>Family :</label>
                <label className='ml-2'>{plant.family}</label>
              </div>
            </div>
          </div>

          <div className='flex mt-8'>
            {plant &&
              plant.urls &&
              plant.urls.map((url) => {
                return (
                  <Link href={url.url} passHref key={url.label}>
                    <button className='globalButton !text-xl hover:scale-110'>{`Learn more on ${url.label}`}</button>
                  </Link>
                );
              })}
          </div>
        </main>
      )}
    </>
  );
};

export default PlantPage;
