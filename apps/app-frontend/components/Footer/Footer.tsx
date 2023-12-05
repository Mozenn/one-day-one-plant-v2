import Link from "next/link";

const Footer = () => {
  return (
    <footer className="flex flex-col items-center w-full h-[10vh] m-0 border-t-1 border-t-solid border-secondary-light">
      <div className="flex items-center text-xs my-4 mx-0">
        <Link href="/terms" passHref>
          Terms
        </Link>
        <label className="my-0 mx-1">|</label>
        <Link href="/privacy" passHref>
          Privacy policy
        </Link>
        <label className="my-0 mx-1">|</label>
        <Link href="/about" passHref>
          About
        </Link>
      </div>
      <p>© Copyright 2023 One Day One Plant</p>
    </footer>
  );
};

export default Footer;
