"use client";

import useFetch from "../../../hooks/useFetch";
import Collection from "@/components/Profile/Collection/Collection";
import { User } from "@/types/user";
import { getGradeFromScore } from "../../../lib/gradeUtils";
import AuthGuard from "@/components/Auth/AuthGuard";
import Spinner from "@/components/Spinner/Spinner";
import ProfilePicture from "@/components/Profile/ProfilePicture/ProfilePicture";

const Profile = ({ params }: { params: { userId: string } }) => {
  const { data: user, mutate } = useFetch<User>({
    url: `/user/${params.userId}`,
  });

  if (!user) {
    return <Spinner />;
  }

  return (
    <AuthGuard>
      <main className="flex flex-col sm:flex-row overflow-hidden min-h-[80vh]">
        <aside className="flex flex-col items-center pt-32 pb-0 px-12 bg-white">
          <ProfilePicture user={user} onNewPictureSelected={() => mutate()} />
          <h2 className="font-semibold text-2xl mt-2">{user.username}</h2>
          <div className="flex items-center text-xl">
            <div className="flex items-center mr-12">
              <img
                className="filter-primary-dark w-8"
                src="/images/icons/leaf.svg"
                alt="leaf icon"
              />
              <p>{user.score}</p>
            </div>
          </div>
          <label
            className={`text-lg font-bold mb-4`}
            style={{
              color: `var(--color-grade-${getGradeFromScore(user.score)})`,
            }}
          >
            {getGradeFromScore(user.score).toUpperCase()}
          </label>
        </aside>
        <section className="flex flex-col items-center justify-center w-full">
          <Collection />
        </section>
      </main>
    </AuthGuard>
  );
};

export default Profile;
