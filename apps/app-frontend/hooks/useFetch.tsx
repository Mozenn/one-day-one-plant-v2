import useSWR from "swr";
import useAuth from "./useAuth";

export type UseFetchParams = {
  [key: string]: any;
};

export type UseFetchHeaders = {
  [key: string]: any;
};

export type UseFetchInput = FetchItem[] | FetchItem;

export type UseFetchOutput<T> = {
  data: T | null;
  error: any;
  mutate: (data?: any, shouldRevalidate?: boolean | undefined) => Promise<any>;
};

export type UseFetchResultAccumulator<T> = (result: any, acc: T) => T;

export type FetchItem = {
  url: string;
  params?: UseFetchParams;
  headers?: UseFetchHeaders;
};

function useFetch<T>(
  fetchInput: UseFetchInput,
  resultAccumulator: UseFetchResultAccumulator<T> = (result, acc) => result.data
): UseFetchOutput<T> {
  const { getAuthClient } = useAuth();

  const { data, error, mutate } = useSWR(
    JSON.stringify(fetchInput),
    async (inputAsString) => {
      const parsedFetchInput: UseFetchInput = JSON.parse(inputAsString);
      const fetchItems: FetchItem[] = Array.isArray(parsedFetchInput)
        ? parsedFetchInput
        : [parsedFetchInput];
      let result: any = {};

      for (const fetchItem of fetchItems) {
        const url = `${process.env.NEXT_PUBLIC_API_URL}${fetchItem.url}`;

        console.log("fetch", fetchItem);
        const axiosClient = await getAuthClient();
        const res = await axiosClient.get(url, {
          params: fetchItem.params,
          headers: fetchItem.headers,
        });
        result = resultAccumulator(res, result);
      }

      console.log("RES", result);
      return result;
    }
  );

  return {
    data,
    error,
    mutate,
  };
}

export default useFetch;
