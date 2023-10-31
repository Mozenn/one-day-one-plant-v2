"use client";

import styles from "./Pagination.module.scss";
import {
  ChangeEventHandler,
  FocusEventHandler,
  KeyboardEventHandler,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { PaginationContext } from "../../contexts/paginationContext";

const Pagination = () => {
  const {
    page,
    goToFirstPage,
    goToLastPage,
    goToPage,
    incrementPage,
    decrementPage,
    atFirstPage,
    atLastPage,
  } = useContext(PaginationContext);
  const [inEditMode, setInEditMode] = useState(false);
  const [currentInputPage, setCurrentInputPage] = useState(page);
  const inputRef = useRef<HTMLInputElement>(null);

  const enterEditMode = useCallback(() => {
    setCurrentInputPage(page);
    inputRef.current?.focus();
  }, [page]);

  useEffect(() => {
    if (inEditMode) {
      enterEditMode();
    }
  }, [inEditMode, enterEditMode]);

  const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const newInputPage = event.target.value;

    if (Number(newInputPage) || newInputPage === "") {
      setCurrentInputPage(event.target.value);
    } else {
      setCurrentInputPage(currentInputPage);
    }
  };

  const onBlur: FocusEventHandler<HTMLInputElement> = (event) => {
    const newPage = Number(event.target.value);
    confirmEdit(newPage);
  };

  const onKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === "Enter") {
      const newPage = Number(event.currentTarget.value);
      confirmEdit(newPage);
    }
  };

  const confirmEdit = (newPage: number) => {
    setInEditMode(false);

    if (Number(newPage)) {
      goToPage(newPage);
    }
  };

  return (
    <div className='flex items-center mt-8 [&>*]:mr-3'>
      <button
        onClick={() => goToFirstPage()}
        disabled={atFirstPage()}
        className={atFirstPage() ? styles.buttonDisabled : styles.button}
      >
        <img
          src='/images/icons/chevrons-left.svg'
          alt='go to first page icon'
        />
      </button>
      <button
        onClick={() => decrementPage()}
        disabled={atFirstPage()}
        className={atFirstPage() ? styles.buttonDisabled : styles.button}
      >
        <img
          src='/images/icons/chevron-left.svg'
          alt='go to previous page icon'
        />
      </button>
      <div className='flex flex-col items-center justify-center w-16 h-7 my-0 mr-3 ml-0 border-2 border-solid border-primary-dark rounded-3xl'>
        {inEditMode ? (
          <input
            className={styles.pageInput}
            value={currentInputPage}
            onChange={onChange}
            onBlur={onBlur}
            onKeyDown={onKeyDown}
            ref={inputRef}
          ></input>
        ) : (
          <label
            className={styles.pageLabel}
            onClick={() => setInEditMode(true)}
          >
            {page}
          </label>
        )}
      </div>
      <button
        onClick={incrementPage}
        disabled={atLastPage()}
        className={atLastPage() ? styles.buttonDisabled : styles.button}
      >
        <img src='/images/icons/chevron-right.svg' alt='go to next page icon' />
      </button>
      <button
        onClick={goToLastPage}
        disabled={atLastPage()}
        className={atLastPage() ? styles.buttonDisabled : styles.button}
      >
        <img
          src='/images/icons/chevrons-right.svg'
          alt='go to last page icon'
        />
      </button>
    </div>
  );
};

export default Pagination;
