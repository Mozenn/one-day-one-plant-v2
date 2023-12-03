"use client";

import useAuth from "@/hooks/useAuth";
import useFetch from "@/hooks/useFetch";
import { User } from "@/types/user";
import { useState, useEffect } from "react";
import Timer from "@/components/Timer/Timer";
import { cooldownBetweenDraw } from "@/lib/timeUtils";
import Link from "next/link";
import { capitalize } from "@/lib/stringUtils";

const Collect = () => {
  const [inCooldown, setInCooldown] = useState(false);
  const { authUser, authFetch } = useAuth();
  const { data, mutate } = useFetch<User>({
    url: `/user/${authUser.id}`,
  });

  useEffect(() => {
    if (data) {
      setInCooldown(
        new Date().getTime() - new Date(data.lastDrawDate).getTime() <
          cooldownBetweenDraw
      );
    }
  }, [data]);

  const fetchRandomPlant = async () => {
    const requestData = {
      dataId: authUser.id,
    };

    const response = await authFetch("/plant/draw", { params: requestData });

    if (response.status === 200) {
      mutate();
    }
  };

  const renderButtons = () => {
    if (!inCooldown) {
      return (
        <button
          onClick={fetchRandomPlant}
          className='!mt-6 globalButton !text-2xl hover:scale-110'
        >
          Collect
        </button>
      );
    } else if (data && data.lastDrawPlant) {
      return (
        <>
          <Timer lastDrawDate={data!.lastDrawDate} />
          {data &&
            data.lastDrawPlant.urls.map((data) => {
              return (
                <a key={data.source} href={data.url} className='globalButton'>
                  {`Learn more on ${capitalize(data.source)}`}
                </a>
              );
            })}
        </>
      );
    }
  };

  const renderImage = () => {
    const readyToCollect =
      !inCooldown || !data || data.lastDrawPlant === undefined;

    return (
      <div className='bg-white border-solid border-primary-dark border-[0.8rem] rounded-3xl'>
        <img
          className={`text-primary h-[20rem] w-auto ${
            readyToCollect
              ? "filter-primary transition-transform hover:animate-wiggle p-8"
              : "rounded-xl"
          }`}
          src={
            readyToCollect
              ? "/images/icons/question.svg"
              : data.lastDrawPlant.imageUrl
          }
          alt={readyToCollect ? "question mark icon" : "last drawn plant"}
        />
      </div>
    );
  };

  const renderName = () => {
    if (inCooldown && data && data.lastDrawPlant !== undefined) {
      return (
        <Link href={`/plant/${data.lastDrawPlant.id}`} passHref>
          <p className='text-2xl mt-4 font-bold underline transition-colors duration-200 hover:text-primary-light active:text-primary'>
            {capitalize(data.lastDrawPlant.name)}
          </p>
        </Link>
      );
    }
  };

  return (
    <main
      className='flex flex-col items-center flex-1 m-0 min-h-[80vh] py-20 px-0'
      role='main'
    >
      <h1
        className='text-primary-dark text-4xl p-6 rounded-full mb-4'
        role='heading'
      >
        Collect your daily plant
      </h1>
      {renderImage()}
      {renderName()}
      {renderButtons()}
    </main>
  );
};

export default Collect;
