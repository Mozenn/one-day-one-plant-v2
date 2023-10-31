import useFetch from "../../../hooks/useFetch";
import Collection from "@/components/Profile/Collection/Collection";
import { Member } from "@/types/member";

const Profile = ({ params }: { params: { memberId: string } }) => {
  const { data: member, error } = useFetch<Member>({
    url: `/api/member`,
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
        <aside className='flex flex-col items-center pt-32 pb-0 px-12 bg-secondary-light'>
          <img
            className={`h-32 w-32 object-cover border-4 border-solid ${
              member.grade
                ? `border-${member.grade.toLowerCase()}`
                : "border-secondary"
            }`}
            src={member.profileImageUrl}
            alt='Profile Image'
          />
          <h2 className='font-normal'>{member.username}</h2>
          <div className='flex items-center text-xl'>
            <div className='flex items-center mr-12'>
              <img
                className='filter-primary-dark'
                src='/images/icons/leaf.svg'
                alt='leaf icon'
              />
              <p>{member.score}</p>
            </div>
          </div>
          <label
            className={`text-lg font-bold mb-4 text-${member.grade.toLowerCase()}`}
          >
            {member.grade}
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
