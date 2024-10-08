"use client";

import useAuth from "@/hooks/useAuth";
import Link from "next/link";
import { useState } from "react";
import styles from "./Header.module.scss";
import MenuDropdown from "./MenuDropdown/MenuDropdown";
import useLoader from "@/hooks/useLoader";
import { NavigationEvents } from "../Analytics/NavigationEvents";
import Plausible from "../Analytics/Plausible/Plausible";

const HeaderSideContent = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const { isAuthenticated, authFetch } = useAuth();
  const { isLoaded } = useLoader();

  const onMenuDropdownClicked = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const closeDropdown = () => {
    setDropdownVisible(false);
  };

  if (!isLoaded) {
    return <></>;
  }

  return (
    <>
      <NavigationEvents />
      {typeof window !== "undefined" && <Plausible />}
      {process.env.NODE_ENV !== "production" && (
        <button
          className={styles.button}
          onClick={async () => {
            const res = await authFetch("/auth");

            const jsonRes = JSON.parse(await res.text());
            console.log(jsonRes);
          }}
        >
          Test Auth
        </button>
      )}
      {isAuthenticated() ? (
        <div className="flex items-center font-normal my-0 mr-8 ml-auto">
          <div className="flex flex-col items-center">
            <button
              className={styles.button}
              data-testid="dropdown-button"
              onClick={onMenuDropdownClicked}
            >
              <img
                className="filter-primary-dark"
                src="/images/icons/menu.svg"
                alt="menu button icon"
              />
            </button>
            {isDropdownVisible && (
              <MenuDropdown closeDropdown={closeDropdown} />
            )}
          </div>
        </div>
      ) : (
        <div className="flex items-center my-0 mr-4 ml-auto">
          <Link href="/auth/login" passHref>
            <p className={styles.button}>Log In</p>
          </Link>
          <Link href="/auth/signup" passHref>
            <p className={styles.button}>Sign Up</p>
          </Link>
        </div>
      )}
    </>
  );
};

export default HeaderSideContent;
