"use client";

import useAuth from "../hooks/useAuth";
import Link from "next/link";

export default function Home() {
  const { isAuthenticated, authId, register } = useAuth();

  const onJoinClicked = async () => {
    await register();
  };

  const sections = [
    {
      id: "draw",
      title: "Draw a plant each day",
      text: `
      Grow your collection by drawing a plant at random each day, 
      and increase your score of worshiper of flora 🌱
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
      Use the provided links and learn more about your daily draw 🤓
      `,
      colored: false,
      alignLeft: false,
      imgSource: "/images/landing/learn.png",
      imgAlt: "learn screenshot",
    },
    {
      id: "collect",
      title: "Gotta Collect ‘Em All!",
      text: `
      Complete your collection, and become an ultimate Worshiper of
      Flora 🎓
      `,
      colored: true,
      alignLeft: true,
      imgSource: "/images/landing/collect.png",
      imgAlt: "collect screenshot",
    },
  ];

  return (
    <div className='flex flex-col'>
      {isAuthenticated() ? (
        <main
          className='flex flex-1 items-center m-0 py-20 px-0 min-h-[80vh]'
          role='main'
        >
          <h1
            className='text-primary-dark text-4xl p-4 rounded-full'
            role='heading'
          >
            Welcome Back!
          </h1>
          <div className='flex flex-col items-center'>
            <Link href={`/profile/${authId}`} passHref>
              <button className='globalButton'>Profile</button>
            </Link>
            <Link href={`/collect`} passHref>
              <button className='globalButton'>Collect</button>
            </Link>
          </div>
        </main>
      ) : (
        <main
          className='flex flex-col items-center flex-1 m-0 min-h-[80vh] py-20 px-0'
          role='main'
        >
          <section className='flex flex-col items-center flex-1 w-full'>
            <h1
              className='text-primary-dark text-4xl p-4 rounded-full'
              role='heading'
            >
              Welcome to One Day One Plant !
            </h1>
            <div className='flex items-center mb-12'>
              <img
                className='ml-28 h-[30rem]'
                src='/images/landing/hero.png'
                alt='hero landing page image'
              />
            </div>
          </section>
          {sections.map((section) => {
            const text = (
              <div
                className={`flex flex-col mb-12 items-start ${
                  section.alignLeft ? "ml-16 mr-16" : "ml-16"
                }`}
              >
                <h2
                  className={`text-2xl self-start mb-0 ${
                    section.alignLeft ? "self-start mb-0" : ""
                  }`}
                >
                  {section.title}
                </h2>
                <p
                  className={`mb-[5vh] max-w-sm text-lg ${
                    section.alignLeft ? "mr-60" : ""
                  }`}
                >
                  {section.text}
                </p>
              </div>
            );

            const img = (
              <img
                className='h-96 w-auto border-solid border-2 border-primary-dark rounded-2xl'
                src={section.imgSource}
                alt={section.imgAlt}
              />
            );

            return (
              <section
                key={section.id}
                className={`flex items-center justify-around mb-12 w-full py-8 ${
                  section.colored ? "bg-primary-light" : ""
                }`}
              >
                {section.alignLeft ? text : img}
                {section.alignLeft ? img : text}
              </section>
            );
          })}
          <section className='mt-16'>
            <button className='globalButton' onClick={onJoinClicked}>
              Start Collecting
            </button>
          </section>
        </main>
      )}
    </div>
  );
}
