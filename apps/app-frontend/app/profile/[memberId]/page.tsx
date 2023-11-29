"use client";

import useFetch from "../../../hooks/useFetch";
import Collection from "@/components/Profile/Collection/Collection";
import { User } from "@/types/user";
import {
  getGradeTextColorFromScore,
  getGradeBorderFromScore,
  getGradeFromScore,
} from "../../../lib/gradeUtils";
import NoContent from "@/components/NoContent/NoContent";

const Profile = ({ params }: { params: { userId: string } }) => {
  const { data: user } = useFetch<User>({
    url: `user/${params.userId}`,
  });

  if (!user) {
    return <NoContent />;
  }

  return (
    <>
      <main className='flex overflow-hidden min-h-[88vh]'>
        <aside className='flex flex-col items-center pt-32 pb-0 px-12 bg-white'>
          <img
            className={`h-48 w-48 object-cover border-8 border-solid 
            ${getGradeBorderFromScore(user.score)} rounded-3xl
            -outline-offset-2 outline-4 outline-primary-dark outline
            `}
            src={user.profilePlantUrl}
            alt='Profile Image'
          />
          <h2 className='font-semibold text-2xl mt-2'>{user.username}</h2>
          <div className='flex items-center text-xl'>
            <div className='flex items-center mr-12'>
              <img
                className='filter-primary-dark w-8'
                src='/images/icons/leaf.svg'
                alt='leaf icon'
              />
              <p>{user.score}</p>
            </div>
          </div>
          <label
            className={`text-lg font-bold mb-4 ${getGradeTextColorFromScore(
              user.score
            )}`}
          >
            {getGradeFromScore(user.score).toUpperCase()}
          </label>
        </aside>
        <section className='flex flex-col items-center justify-center w-full'>
          <Collection />
        </section>
      </main>
    </>
  );
};

export default Profile;
