"use client";

import Link from "next/link";
import { useState } from "react";
import MenuDropdown from "./MenuDropdown/MenuDropdown";
import { ToastContainer } from "react-toastify";
import GoogleAnalytics from "../GoogleAnalytics/GoogleAnalytics";
import useAuth from "../../hooks/useAuth";
import styles from "./Header.module.scss";

const Header = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const { isAuthenticated } = useAuth();

  const onMenuDropdownClicked = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const closeDropdown = () => {
    setDropdownVisible(false);
  };

  return (
    <>
      {process.env.NODE_ENV === "production" &&
        typeof window !== "undefined" && <GoogleAnalytics />}
      <header className={styles.container}>
        <Link href='/' passHref>
          <img
            className='h-20 w-auto mt-1 mr-4 mb-1 ml-4 cursor-pointer'
            src='/images/logo.png'
            alt='Logo'
          />
        </Link>
        <button
          className={styles.button}
          onClick={async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}auth`, {
              method: "GET",
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
              },
            });

            const jsonRes = JSON.parse(await res.text());
            console.log(jsonRes);
          }}
        >
          Test Auth
        </button>
        {isAuthenticated() ? (
          <>
            <div className='flex items-center font-normal my-0 mr-4 ml-auto'>
              <div className='flex flex-col items-center'>
                <button
                  className={styles.button}
                  data-testid='dropdown-button'
                  onClick={onMenuDropdownClicked}
                >
                  <img src='/images/icons/menu.svg' alt='menu button icon' />
                </button>
                {isDropdownVisible && (
                  <MenuDropdown
                    userId={"TOCHANGE"}
                    closeDropdown={closeDropdown}
                  />
                )}
              </div>
            </div>
          </>
        ) : (
          <div className='flex items-center my-0 mr-4 ml-auto'>
            <Link href='/auth/login' passHref>
              <p className={styles.button}>Log In</p>
            </Link>
            <Link href='/auth/signup' passHref>
              <p className={styles.button}>Sign Up</p>
            </Link>
          </div>
        )}
      </header>
      <ToastContainer autoClose={false} />
    </>
  );
};

export default Header;
