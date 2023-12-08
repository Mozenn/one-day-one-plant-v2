import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import { Page } from "../types/page";
import useIntersectionObserver, {
  IntersectionObserverHookCallback,
} from "./useIntersectionObserver";

export type InfiniteScrollingInternalInputs = {
  loadMore: () => void;
  hasMoreToLoad: boolean;
  options?: IntersectionObserverInit;
  showDebugLog?: boolean;
};
export type InfiniteScrollingInternalOutput = [
  IntersectionObserverHookCallback,
];

const useInfiniteScrollingInternal = ({
  loadMore,
  hasMoreToLoad,
  options,
  showDebugLog,
}: InfiniteScrollingInternalInputs): InfiniteScrollingInternalOutput => {
  const [target, isVisible] = useIntersectionObserver(options, showDebugLog);

  useEffect(() => {
    showDebugLog &&
      console.log("useInfiniteScrollingInternal: Visibile", isVisible);
    if (isVisible && hasMoreToLoad) {
      loadMore();
    }
  }, [isVisible, hasMoreToLoad, loadMore, showDebugLog]);

  return [target];
};

export type FetchParams = {
  [key: string]: any;
};

export type FetchHeaders = {
  [key: string]: any;
};

export type InfiniteScrollingInputs<T> = {
  fetchUrl: string;
  fetchParams: FetchParams;
  fetchHeaders?: FetchHeaders;
  options?: IntersectionObserverInit;
  comparator?: (a: T, b: T) => boolean;
  showDebugLog?: boolean;
};
export type InfiniteScrollingOutput<T> = [
  IntersectionObserverHookCallback,
  T[],
  boolean,
  () => void,
];

const defaultFetchParams = {
  elementsPerPage: 10,
  direction: "dsc",
  key: "createdAt",
};

function useInfiniteScrolling<T>({
  fetchUrl,
  fetchParams = { defaultFetchParams },
  fetchHeaders = {},
  options,
  comparator,
  showDebugLog,
}: InfiniteScrollingInputs<T>): InfiniteScrollingOutput<T> {
  const [storedElements, setStoredElements] = useState<T[]>([]);
  const [page, setPage] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasMoreToLoad, setHasMoreToLoad] = useState<boolean>(true);
  const [previousTotal, setPreviousTotal] = useState<number>(0);

  const loadMore = () => {
    setIsLoading(true);

    if (data && data.content) {
      const newElements = data.content;
      showDebugLog &&
        console.log(
          `useInfiniteScrolling: content at page ${page}`,
          data.content,
        );

      let newStoredElements = [];
      // detect if fetched data is invalid
      let shouldReset = false;

      if (comparator) {
        newStoredElements = newElements.filter((e) =>
          storedElements.every((pe) => !comparator(e, pe)),
        );
        newStoredElements = [...storedElements, ...newStoredElements];
      } else {
        newStoredElements = [...storedElements, ...newElements];
      }
      if (
        newStoredElements.length !==
        storedElements.length + newElements.length
      ) {
        shouldReset = true;
        showDebugLog &&
          console.log("useInfiniteScrolling: Incoherency detected");
      } else {
        setStoredElements(newStoredElements);
      }

      showDebugLog &&
        console.log(
          "useInfiniteScrolling: should stop loading ?",
          newStoredElements.length,
          data.total,
        );
      if (shouldReset) {
        reset();
      } else if (newStoredElements.length === data.total) {
        // TODO fix
        setHasMoreToLoad(false);
        setPreviousTotal(data.total);
        showDebugLog &&
          console.log("useInfiniteScrolling: Disabling loading more");
      } else {
        setPage((prevPage) => prevPage + 1);
      }
    }

    setIsLoading(false);
  };

  const reset = () => {
    showDebugLog && console.log("useInfiniteScrolling: reset");
    setStoredElements([]);
    setPage(0);
    setHasMoreToLoad(true);
  };

  const refresh = async () => {
    showDebugLog && console.log("useInfiniteScrolling: mutate");
    await mutate();
    showDebugLog && console.log("useInfiniteScrolling: done mutate");
    reset();
  };

  const [ref] = useInfiniteScrollingInternal({
    loadMore,
    hasMoreToLoad,
    options,
    showDebugLog,
  });

  const { data, error, mutate } = useFetch<Page<T>>({
    url: fetchUrl,
    params: {
      page: page,
      ...fetchParams,
    },
    headers: fetchHeaders,
  });

  useEffect(() => {
    showDebugLog &&
      console.log(
        "useInfiniteScrolling: checking new data",
        hasMoreToLoad,
        previousTotal,
        data,
      );
    if (!hasMoreToLoad && data && data.total != previousTotal) {
      reset();
    }
  }, [data, hasMoreToLoad, previousTotal, showDebugLog]);

  return [ref, storedElements, isLoading, refresh];
}

export default useInfiniteScrolling;
