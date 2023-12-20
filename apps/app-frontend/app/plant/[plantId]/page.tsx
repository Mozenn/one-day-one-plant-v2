"use client";

import useFetch from "../../../hooks/useFetch";
import { Plant } from "@/types/plant";
import Spinner from "@/components/Spinner/Spinner";
import Link from "next/link";
import styles from "../../../styles/Plant.module.scss";
import { capitalize } from "@/lib/stringUtils";
import AuthGuard from "@/components/Auth/AuthGuard";
import { getRarityFilter } from "@/lib/rarityUtills";

const PlantPage = ({ params }: { params: { plantId: string } }) => {
  const { data: plant } = useFetch<Plant>({
    url: `/plant/${params.plantId}`,
  });

  return (
    <AuthGuard>
      {!plant ? (
        <Spinner />
      ) : (
        <main className="flex flex-col min-h-[78vh] py-0 px-20">
          <div className="flex mt-8">
            <img
              src={plant.imageUrl}
              alt={`A picture of a ${capitalize(plant.name)}`}
              className="rounded-2xl w-[35rem] shadow-[0_0px_12px_0px_rgba(0,0,0,0.6)]"
            />
            <div className="ml-14">
              <h2 className="text-3xl font-bold mr-8 mb-4">
                {capitalize(plant.name)}
              </h2>
              <div className={styles.field}>
                <label>Scientific name :</label>
                <label className="ml-2">
                  {capitalize(plant.scientificName)}
                </label>
              </div>
              <div className={styles.field}>
                <label>Family :</label>
                <label className="ml-2">{capitalize(plant.family)}</label>
              </div>
              <div className={styles.field}>
                <label>Rarity :</label>
                <label
                  className="ml-2"
                  style={{
                    color: `var(--color-rarity-${plant.rarity.toLocaleLowerCase()})`,
                  }}
                >
                  {capitalize(plant.rarity.toLocaleLowerCase())}
                </label>
                <img
                  src={`/images/icons/rarity-${plant.rarity.toLocaleLowerCase()}.svg`}
                  alt="Rarity icon"
                  className="ml-2"
                  style={{
                    filter: `var(--filter-rarity-${plant.rarity.toLocaleLowerCase()})`,
                  }}
                />
              </div>
            </div>
          </div>

          <div className="flex mt-8">
            {plant &&
              plant.urls &&
              plant.urls.map((url) => {
                return (
                  <Link href={url.url} passHref key={url.source}>
                    <button className="globalButton !text-xl hover:scale-110 !font-medium">{`Learn more on ${capitalize(
                      url.source,
                    )}`}</button>
                  </Link>
                );
              })}
          </div>
        </main>
      )}
    </AuthGuard>
  );
};

export default PlantPage;
