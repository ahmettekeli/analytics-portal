import useSWR from "swr";

function useFetch<T>(url: string) {
  const fetcher = (apiUrl: string) => fetch(apiUrl).then((res) => res.json());
  const { data, error } = useSWR(url, fetcher);
  return {
    data: data as T,
    isLoading: !error && !data,
    isError: error,
  };
}

export default useFetch;
