"use client";

import HeroCapsule from "@/components/Home/HeroCapsule";
import useAuth from "../hooks/useAuth";
import Link from "next/link";
import useLoader from "@/hooks/useLoader";
import Spinner from "@/components/Spinner/Spinner";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

export default function Home() {
  const { isAuthenticated, authId } = useAuth();
  const { isLoaded } = useLoader();
  const [scheduledToast, setScheduledToast] = useLocalStorage<string>(
    "scheduledToast",
    null,
  );

  useEffect(() => {
    if (scheduledToast && isLoaded) {
      const parsedScheduledToast = JSON.parse(scheduledToast);
      toast(parsedScheduledToast.message, {
        type: parsedScheduledToast.type,
      });

      setScheduledToast(null);
    }
  }, [scheduledToast, setScheduledToast, isLoaded]);

  if (!isLoaded) {
    return <Spinner />;
  }

  const sections = [
    {
      id: "draw",
      title: "Draw a plant each day",
      text: `
      Grow your collection by drawing a plant at random each day, 
      and increase your score of worshiper of flora
      `,
      colored: true,
      alignLeft: true,
      imgSource: "/images/landing/draw.png",
      imgAlt: "draw screenshot",
    },
    {
      id: "learn",
      title: "Learn about earth flora",
      text: `
      Use the provided links and learn more about your daily draw
      `,
      colored: false,
      alignLeft: false,
      imgSource: "/images/landing/learn.png",
      imgAlt: "learn screenshot",
    },
    {
      id: "collect",
      title: "Collect plants",
      text: `
      Complete your plant collection, and become an ultimate Worshiper of
      Flora
      `,
      colored: true,
      alignLeft: true,
      imgSource: "/images/landing/collect.png",
      imgAlt: "collect screenshot",
    },
  ];

  const heroCapsules = [
    {
      id: 1,
      url: "/images/landing/hero/acer-saccharinum.jpg",
      alt: "image of a acer saccharinum",
      additionalStyle: `rotate-[30deg] top-40 left-20 hidden xl:block`,
      additionalImageStyle: "border-primary",
    },
    {
      id: 2,
      url: "/images/landing/hero/abies-lasiocarpa.jpg",
      alt: "image of a abies lasiocarpa",
      additionalStyle:
        "rotate-[15deg] top-[10rem] left-[85rem] hidden 2xl:block",
      additionalImageStyle: "border-secondary",
    },
    {
      id: 3,
      url: "/images/landing/hero/edelweiss.jpg",
      alt: "image of a edelweiss",
      additionalStyle:
        "rotate-[-24deg] top-[45rem] left-[50rem] hidden xl:block",
      additionalImageStyle: "border-primary",
    },
    {
      id: 4,
      url: "/images/landing/hero/pistia-stratiotes.jpg",
      alt: "image of a pistia stratiotes",
      additionalStyle: "rotate-[5deg] top-[15rem] left-[60rem] hidden xl:block",
      additionalImageStyle: "border-secondary",
    },
    {
      id: 5,
      url: "/images/landing/hero/sour-cherry.jpg",
      alt: "image of a sour cherry",
      additionalStyle:
        "rotate-[-15deg] top-[45rem] left-[80rem] hidden 2xl:block",
      additionalImageStyle: "border-primary",
    },
    {
      id: 6,
      url: "/images/landing/hero/subalpinefir.jpg",
      alt: "image of a subalpinefir",
      additionalStyle:
        "rotate-[-25deg] top-[10rem] left-[38rem] !w-48 hidden xl:block",
      additionalImageStyle: "border-secondary",
    },
    {
      id: 7,
      url: "/images/landing/hero/subalpinefir2.jpg",
      alt: "image of a subalpinefir",
      additionalStyle:
        "rotate-[5deg] top-[38rem] left-[15rem] !w-48 hidden xl:block",
      additionalImageStyle: "border-primary",
    },
  ];

  return (
    <div className="flex flex-col">
      {isAuthenticated() ? (
        <main
          className="flex flex-col flex-1 items-center justify-center py-20 px-0 min-h-[80vh]"
          role="main"
        >
          <h1
            className="text-primary-dark text-4xl p-4 rounded-full font-bold mt-1 text-center"
            role="heading"
          >
            Welcome Back!
          </h1>
          <div className="flex  items-center">
            <Link href={`/profile/${authId}`} passHref>
              <button className="globalButton">Profile</button>
            </Link>
            <Link href={`/collect`} passHref>
              <button className="globalButton">Collect</button>
            </Link>
            <Link href={`/scoreboard`} passHref>
              <button className="globalButton">Scoreboard</button>
            </Link>
          </div>
        </main>
      ) : (
        <main
          className="flex flex-col items-center flex-1 min-h-[80vh] pb-20 px-0"
          role="main"
        >
          <section className="flex flex-col items-center justify-center w-full h-[100vh]">
            <h1
              className="text-primary-dark text-5xl font-semibold p-4 rounded-full text-center"
              role="heading"
            >
              Welcome to One Day One Plant!
            </h1>
            {heroCapsules.map((capsule) => (
              <HeroCapsule key={capsule.id} capsuleProps={capsule} />
            ))}
          </section>
          {sections.map((section) => {
            const text = (
              <div
                className={`flex flex-col mb-12 items-start ${
                  section.alignLeft ? "ml-16 mr-16" : "ml-16"
                }`}
              >
                <h2
                  className={`text-3xl self-start mb-0 ${
                    section.alignLeft ? "self-start mb-0" : ""
                  }`}
                >
                  {section.title}
                </h2>
                <p
                  className={`mb-[5vh] max-w-sm text-xl ${
                    section.alignLeft ? "mr-60" : ""
                  }`}
                >
                  {section.text}
                </p>
              </div>
            );

            const img = (
              <img
                className="h-96 w-auto border-solid border-2 border-primary-dark rounded-2xl"
                src={section.imgSource}
                alt={section.imgAlt}
              />
            );

            return (
              <section
                key={section.id}
                className={`flex items-center justify-around mb-12 w-full py-8 ${
                  section.colored ? "bg-primary text-white" : ""
                } flex-col xl:flex-row`}
              >
                {section.alignLeft ? text : img}
                {section.alignLeft ? img : text}
              </section>
            );
          })}
          <section className="mt-16">
            <Link href="/auth/signup" passHref>
              <p className="globalButton !text-2xl hover:scale-110">
                Start Collecting
              </p>
            </Link>
          </section>
        </main>
      )}
      <ToastContainer
        autoClose={false}
        position="bottom-right"
        theme="colored"
      />
    </div>
  );
}
