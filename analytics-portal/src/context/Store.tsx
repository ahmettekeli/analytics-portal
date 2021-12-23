import {
  createContext,
  ReactNode,
  useReducer,
  useContext,
  useEffect,
} from "react";
import Reducer from "./Reducer";
import { actionTypes } from "./ActionTypes";
import {
  AppDataInterface,
  ContextActionType,
  AnalyticsStateInterface,
  AnalyticsStateType,
  CampaignType,
} from "./Interfaces";
import { urls } from "../constants"; //TODO fix process.env.REACT_APP_API_URL

// const initialState: AnalyticsStateInterface = {
const initialState: AnalyticsStateType = {
  appData: [],
  currentApp: null,
  isLoading: true,
  errorMessage: null,
};

export const Context = createContext<{
  // state: AnalyticsStateInterface;
  state: AnalyticsStateType;
  dispatch: React.Dispatch<ContextActionType>;
}>({
  state: initialState,
  dispatch: () => null,
});

function AnalyticsProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(Reducer, initialState);

  useEffect(() => {
    // if (!localStorage.getItem("stateData")) {
    //   // get app data from local storage
    //   const data = JSON.parse(localStorage.getItem("stateData") as string);
    //   console.log("local storage stateData:", data);
    //   dispatch({
    //     type: actionTypes.GET_ANALYTICS_DATA,
    //     payload: {
    //       appData: data.appData,
    //       isLoading: false,
    //       currentApp: null,
    //       errorMessage: null,
    //     },
    //   });
    // } else {
    Promise.all([fetch(urls.apiUrlApp), fetch(urls.apiUrlCampaign)])
      .then((values) => {
        Promise.all([values[0].json(), values[1].json()]).then((values) => {
          console.log("campaigns", values[1]);
          //TODO values[1] icinde don ve hepsine appid ekle, default lara -1 ver,
          //custom ekleyeceklerine hangi app e aitse o app in id sini ver.
          //TODO custom eklenenleri localstorage dan cekebilirsin.

          //Since there is no appId in the given campaigns, we will add it to all of them.There should be a value to connect a campaign to an app.
          //It's usually an id.
          //We'll add appId to the campaigns that will be added later by the client.
          //Each campaign will have an appId that's corresponding to its app.
          let campaigns: CampaignType[] = values[1].map(
            (campaign: CampaignType) => {
              campaign["appId"] = "-1";
              return campaign;
            }
          );
          let payload: AnalyticsStateType = {
            //adding all campaigns to each app as I was explained in the response e-mail i got for my questions.
            appData: values[0].map((app: AppDataInterface) => {
              return {
                ...app,
                // campaigns: values[1],
                campaigns,
              };
            }),
            isLoading: false,
            currentApp: null,
            errorMessage: null,
          };
          //set appData to localStorage
          // localStorage.setItem("stateData", JSON.stringify(payload));
          //set appData to state
          dispatch({
            type: actionTypes.GET_ANALYTICS_DATA,
            payload,
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
          } as AnalyticsStateType,
        });
      });
    // }
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
