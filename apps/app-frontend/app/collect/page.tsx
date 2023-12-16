"use client";

import useAuth from "@/hooks/useAuth";
import useFetch from "@/hooks/useFetch";
import { User } from "@/types/user";
import { useState, useEffect } from "react";
import Timer from "@/components/Timer/Timer";
import { cooldownBetweenDraw } from "@/lib/timeUtils";
import Link from "next/link";
import { capitalize } from "@/lib/stringUtils";
import AuthGuard from "@/components/Auth/AuthGuard";
import useLocalStorage from "@/hooks/useLocalStorage";
import { ToastContainer, toast } from "react-toastify";
import { getGradeFromScore, getNewGrade } from "@/lib/gradeUtils";
import { motion } from "framer-motion";
import { getRarityScoreOnDraw } from "@/lib/rarityUtills";

const Collect = () => {
  const [inCooldown, setInCooldown] = useState(false);
  const [collected, setCollected] = useState(false);
  const { authId, authFetch } = useAuth();
  const { data, mutate } = useFetch<User>({
    url: `/user/${authId}`,
  });
  const [scoreDuringDraw, setScoreDuringDraw] = useLocalStorage<number>(
    "scoreDuringDraw",
    null,
  );

  useEffect(() => {
    if (data) {
      setInCooldown(
        new Date().getTime() - new Date(data.lastDrawDate).getTime() <
          cooldownBetweenDraw,
      );
    }

    if (scoreDuringDraw && data?.score) {
      const newGrade = getNewGrade(scoreDuringDraw, data.score);

      if (newGrade) {
        setScoreDuringDraw(null);
        toast(
          `You've reached the grade of ${capitalize(
            getGradeFromScore(data?.score),
          )}, congratulation!`,
          {
            type: "success",
          },
        );
      }
    }
  }, [data, scoreDuringDraw, setScoreDuringDraw]);

  const fetchRandomPlant = async () => {
    const requestData = {
      userId: authId,
    };

    const response = await authFetch("/plant/draw", { params: requestData });

    if (response.status === 200) {
      setScoreDuringDraw(data?.score);
      setTimeout(() => {
        setCollected(true);
        mutate();
      }, 400);
    }
  };

  const renderButtons = () => {
    if (!inCooldown) {
      return (
        <button
          onClick={fetchRandomPlant}
          className={`!mt-6 globalButton !text-2xl hover:scale-110 ${
            !data?.verified && "globalButtonDisabled hover:scale-100"
          }`}
          disabled={!data?.verified}
        >
          {!data?.verified ? "Confirm Email to start collecting" : "Collect"}
        </button>
      );
    } else if (data && data.lastDrawPlant) {
      return (
        <>
          <Timer lastDrawDate={data!.lastDrawDate} />
          {data &&
            data.lastDrawPlant.urls.map((data) => {
              return (
                <a key={data.source} href={data.url} className="globalButton">
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
    // border-solid border-primary-dark border-[0.8rem]
    return (
      <div className="bg-white shadow-[0_0px_10px_0px_rgba(0,0,0,0.4)] rounded-3xl">
        <img
          className={`text-primary h-[20rem] w-auto ${
            readyToCollect
              ? "filter-primary-dark transition-transform hover:animate-wiggle p-8"
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
          <p className="text-2xl mt-4 font-bold underline transition-colors duration-200 hover:text-primary-light active:text-primary">
            {capitalize(data.lastDrawPlant.name)}
          </p>
        </Link>
      );
    }
  };

  const animationVariants = {
    hidden: {
      opacity: 0,
      y: 0,
    },
    visible: {
      opacity: [0, 1, 0],
      scale: [0.5, 1, 1],
      y: [0, -300],
      transition: { duration: 3 },
    },
  };

  return (
    <AuthGuard>
      <main
        className="flex flex-col items-center flex-1 m-0 min-h-[80vh] py-20 px-0"
        role="main"
      >
        <h1
          className="text-primary-dark text-4xl p-6 rounded-full mb-4 font-bold"
          role="heading"
        >
          Collect your daily plant
        </h1>
        {renderImage()}
        {renderName()}
        {renderButtons()}
        <ToastContainer
          autoClose={false}
          position="bottom-right"
          theme="colored"
        />
        <motion.div
          variants={animationVariants}
          initial="hidden"
          animate={collected ? "visible" : "hidden"}
          className="absolute top-1/2 left-2/3 flex items-center justify-center w-32 h-32"
        >
          <p className="text-white text-3xl font-semibold bg-primary p-4 rounded-3xl">
            {`+ ${getRarityScoreOnDraw(data?.lastDrawPlant.rarity || "RARE")}`}
          </p>
        </motion.div>
      </main>
    </AuthGuard>
  );
};

export default Collect;
