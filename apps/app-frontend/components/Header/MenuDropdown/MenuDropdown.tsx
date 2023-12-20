"use client";

import Link from "next/link";
import styles from "./MenuDropdown.module.scss";
import ReactDOM from "react-dom";
import useAuth from "../../../hooks/useAuth";

const MenuDropdown = ({ closeDropdown }: { closeDropdown: () => void }) => {
  const { logout, authId } = useAuth();

  const menuOptions = [
    {
      label: "Profile",
      link: `/profile/${authId}`,
    },
    {
      label: "Collect",
      link: "/collect",
    },
    {
      label: "Scoreboard",
      link: "/scoreboard",
    },
    {
      label: "Log out",
      action: () => {
        logout();
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
    <div
      className="absolute z-20 top-20 right-3 box-border h-auto inline-block bg-white text-primary-dark
    rounded-xl border-solid border-primary-dark shadow-[0_0px_10px_0px_rgba(0,0,0,0.4)]"
    >
      <ul className="list-none p-2 flex flex-col items-center">
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
    document.querySelector<Element>("#__next")!,
  );
};

export default MenuDropdown;
