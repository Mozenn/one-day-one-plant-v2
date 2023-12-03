import { capitalize } from "@/lib/stringUtils";

const AuthFieldLabel = ({ name, label }: { name: string; label: string }) => {
  return (
    <label htmlFor={name} className='text-xl font-medium mt-4'>
      {capitalize(label)}
    </label>
  );
};

export default AuthFieldLabel;
