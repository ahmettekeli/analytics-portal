import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";
import { AnalyticsDataInterface } from "./Interfaces";
import { urls } from "../constants"; //TODO fix process.env.REACT_APP_API_URL

const initialState = {
  analyticsData: [] as AnalyticsDataInterface[],
  isLoading: true,
  errorMessage: null,
};

export const Context = createContext<{
  analyticsData: AnalyticsDataInterface[];
  isLoading: boolean;
  errorMessage: string | null;
}>(initialState);

function AnalyticsProvider({ children }: { children: ReactNode }) {
  const [analyticsData, setAnalyticsData] =
    useState<AnalyticsDataInterface[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, seterrorMessage] = useState<string | null>(null);

  useEffect(() => {
    fetch(urls.apiUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log("fetched data:", data);
        setAnalyticsData(data as unknown as AnalyticsDataInterface[]);
        setIsLoading(false);
      })
      .catch((err) => {
        seterrorMessage(err.message);
      });
  }, []);

  return (
    <Context.Provider
      value={{
        analyticsData: analyticsData as AnalyticsDataInterface[],
        isLoading,
        errorMessage,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export default AnalyticsProvider;

export function useAPI() {
  const context = useContext(Context);
  if (!context) {
    throw new Error("Context must be used within a Provider");
  }
  return context;
}
