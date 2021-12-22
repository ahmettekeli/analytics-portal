import {
  createContext,
  ReactNode,
  useReducer,
  useContext,
  useState,
  useEffect,
} from "react";
import Reducer from "./Reducer";
import { actionTypes } from "./ActionTypes";
import {
  AppDataInterface,
  CampaignDataInterface,
  ContextActionInterface,
  AnalyticsStateInterface,
  AppCampaignType,
} from "./Interfaces";
import { urls } from "../constants"; //TODO fix process.env.REACT_APP_API_URL

const initialState: AnalyticsStateInterface = {
  appData: [] as AppDataInterface[],
  campaignData: [] as CampaignDataInterface[],
  isLoading: true,
  errorMessage: null,
};

export const Context = createContext<{
  state: AnalyticsStateInterface;
  // dispatch: () => null;
  dispatch: React.Dispatch<ContextActionInterface>;
}>({
  state: initialState,
  dispatch: () => null,
});

function AnalyticsProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(Reducer, initialState);

  useEffect(() => {
    Promise.all([fetch(urls.apiUrlApp), fetch(urls.apiUrlCampaign)])
      .then((values) => {
        Promise.all([values[0].json(), values[1].json()]).then((values) => {
          dispatch({
            type: actionTypes.GET_ANALYTICS_DATA,
            payload: {
              appData: values[0],
              campaignData: values[1],
              isLoading: false,
              errorMessage: null,
            } as AnalyticsStateInterface,
          });
        });
      })
      .catch((err) => {
        dispatch({
          type: actionTypes.GET_ANALYTICS_DATA,
          payload: {
            ...state,
            isLoading: false,
            errorMessage: `Error fetching data: ${err.message}`,
          } as AnalyticsStateInterface,
        });
      });
  }, []);

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
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
