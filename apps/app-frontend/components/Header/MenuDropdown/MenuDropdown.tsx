"use client";

import Link from "next/link";
import styles from "./MenuDropdown.module.scss";
import ReactDOM from "react-dom";
import useAuth from "../../../hooks/useAuth";

const MenuDropdown = ({
  memberId,
  closeDropdown,
}: {
  memberId: String;
  closeDropdown: () => void;
}) => {
  const { logout } = useAuth();

  const menuOptions = [
    {
      label: "Profile",
      link: `/profile/${memberId}`,
    },
    {
      label: "Collect",
      link: "/collect",
    },
    {
      label: "Settings",
      link: "/settings",
    },
    {
      label: "Log out",
      action: () => {
        logout(process.env.NEXT_PUBLIC_APP_URL);
      },
    },
  ];

  const renderOption = (option: any) => {
    return option.action ? (
      <button
        className={styles.button}
        onClick={() => {
          option.action();
          closeDropdown();
        }}
      >
        {option.label}
      </button>
    ) : (
      <button className={styles.button} onClick={closeDropdown}>
        {option.label}
      </button>
    );
  };

  return ReactDOM.createPortal(
    <div className={styles.container}>
      <ul className='list-none py-0 px-2 flex flex-col items-center'>
        {menuOptions.map((option) => {
          return (
            <li key={option.label}>
              {option.link ? (
                <Link href={option.link}>{renderOption(option)}</Link>
              ) : (
                renderOption(option)
              )}
            </li>
          );
        })}
      </ul>
    </div>,
    document.querySelector<Element>("#__next")!
  );
};

export default MenuDropdown;
