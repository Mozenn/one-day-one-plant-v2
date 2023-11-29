import { capitalize } from "@/lib/stringUtils";

const AuthFieldLabel = ({ name }: { name: string }) => {
  return (
    <label htmlFor={name} className='text-xl font-medium mt-4'>
      {capitalize(name)}
    </label>
  );
};

export default AuthFieldLabel;