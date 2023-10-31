"use client";

import useAuth from "@/hooks/useAuth";
import useFetch from "@/hooks/useFetch";
import { Member } from "@/types/member";
import { useState, useEffect } from "react";
import Timer from "@/components/Timer/Timer";
import { cooldownBetweenDraw } from "@/lib/timeUtils";

const Collect = () => {
  const [inCooldown, setInCooldown] = useState(true);
  const { authId, getAuthClient } = useAuth();
  const { data: member, mutate } = useFetch<Member>({
    url: `/api/member`,
    params: {
      id: authId,
    },
  });

  useEffect(() => {
    if (member) {
      setInCooldown(
        new Date().getTime() - new Date(member.lastDrawDate).getTime() >
          cooldownBetweenDraw
      );
    }
  }, [member]);

  const fetchRandomPlant = async () => {
    const axiosClient: any = await getAuthClient();

    const requestData = {
      memberId: authId,
    };
    const url = `${process.env.NEXT_PUBLIC_API_URL}/plant/draw`;
    const response = await axiosClient.get(url, requestData);

    if (response.status === 200) {
      mutate();
    }
  };

  const renderButtons = () => {
    if (!inCooldown) {
      return (
        <button onClick={fetchRandomPlant} className='!mt-6 globalButton'>
          Collect
        </button>
      );
    } else if (member && member.lastDrawPlant) {
      return (
        <>
          <Timer lastDrawDate={member!.lastDrawDate} />
          <a href={member?.lastDrawPlant.imageUrl} className='globalButton'>
            Learn more
          </a>
        </>
      );
    }
  };

  const renderImage = () => {
    const readyToCollect =
      !inCooldown || !member || member.lastDrawPlant === undefined;

    return (
      <img
        className='text-primary p-8 h-[20rem] w-auto filter-primary transition-transform hover:animate-wiggle'
        src={
          readyToCollect
            ? "/images/icons/question.svg"
            : member.lastDrawPlant.imageUrl
        }
        alt={readyToCollect ? "question mark icon" : "last drawn plant"}
      />
    );
  };

  const renderName = () => {
    if (inCooldown && member && member.lastDrawPlant !== undefined) {
      return <p className=''>{member.lastDrawPlant.name}</p>;
    }
  };

  return (
    <main
      className='flex flex-col items-center flex-1 m-0 min-h-[80vh] py-20 px-0'
      role='main'
    >
      <h1
        className='text-primary-dark text-4xl p-4 rounded-full'
        role='heading'
      >
        Collect your daily plant
      </h1>
      <div className='bg-secondary-light border-solid border-primary border-[0.4rem] rounded-3xl'>
        {renderImage()}
      </div>
      {renderName()}
      {renderButtons()}
    </main>
  );
};

export default Collect;
