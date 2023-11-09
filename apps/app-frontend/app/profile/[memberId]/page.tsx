"use client";

import useFetch from "../../../hooks/useFetch";
import Collection from "@/components/Profile/Collection/Collection";
import { Member } from "@/types/member";
import {
  getGradeTextColorFromScore,
  getGradeBorderFromScore,
  getGradeFromScore,
} from "../../../lib/gradeUtils";

const Profile = ({ params }: { params: { memberId: string } }) => {
  const { data: member } = useFetch<Member>({
    url: `/member`,
    params: {
      id: params.memberId,
    },
  });

  if (!member) {
    return null;
  }

  return (
    <>
      <main className='flex overflow-hidden min-h-[88vh]'>
        <aside className='flex flex-col items-center pt-32 pb-0 px-12 bg-white'>
          <img
            className={`h-48 w-auto object-cover border-8 border-solid 
            ${getGradeBorderFromScore(member.score)} rounded-3xl
            -outline-offset-2 outline-4 outline-primary-dark outline
            `}
            src={member.profileImageUrl}
            alt='Profile Image'
          />
          <h2 className='font-semibold text-2xl mt-2'>{member.username}</h2>
          <div className='flex items-center text-xl'>
            <div className='flex items-center mr-12'>
              <img
                className='filter-primary-dark w-8'
                src='/images/icons/leaf.svg'
                alt='leaf icon'
              />
              <p>{member.score}</p>
            </div>
          </div>
          <label
            className={`text-lg font-bold mb-4 ${getGradeTextColorFromScore(
              member.score
            )}`}
          >
            {getGradeFromScore(member.score).toUpperCase()}
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
