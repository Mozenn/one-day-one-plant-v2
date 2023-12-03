import Link from "next/link";
import { ToastContainer } from "react-toastify";
import styles from "./Header.module.scss";
import HeaderSideContent from "./HeaderSideContent";
import { Suspense } from "react";

const Header = () => {
  return (
    <>
      <header className={styles.container}>
        <Link href='/' passHref>
          <img
            className='h-20 w-auto mt-1 mr-4 mb-1 ml-4 cursor-pointer'
            src='/images/logo.png'
            alt='Logo'
          />
        </Link>
        <HeaderSideContent />
      </header>
      <ToastContainer autoClose={false} />
    </>
  );
};

export default Header;
