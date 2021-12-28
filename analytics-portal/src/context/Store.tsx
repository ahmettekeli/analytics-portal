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
  AnalyticsStateType,
  CampaignType,
} from "./Interfaces";

const initialState: AnalyticsStateType = {
  appData: [],
  currentApp: undefined,
  isLoading: true,
  errorMessage: null,
};

export const Context = createContext<{
  state: AnalyticsStateType;
  dispatch: React.Dispatch<ContextActionType>;
}>({
  state: initialState,
  dispatch: () => null,
});

function AnalyticsProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(Reducer, initialState);

  //TODO useEffect depencdency array e state i eklemeyigoz ardi et.
  useEffect(() => {
    //TODO 2 fetch yapmana gerek yok. onclick aninda campaign leri fetch et.
    //fetch yerine useSWR kullanabilirsin.
    //burayi custom hook yapabilirim. helper olabilir.
    Promise.all([
      fetch(process.env.REACT_APP_APP_ENDPOINT as string),
      fetch(process.env.REACT_APP_CAMPAIGN_ENDPOINT as string),
    ])
      //await promiseAll kullanilabilir 2. promise all icin.
      .then((values) => {
        Promise.all([values[0].json(), values[1].json()]).then((values) => {
          //Since there is no appId in the given campaigns, we will add it to all of them.There should be a value to connect a campaign to an app.
          //It's usually an id.
          //We'll add appId to the campaigns that will be added later by the client.
          //Each campaign will have an appId that's corresponding to its app.

          const campaigns: CampaignType[] = values[1].map(
            (campaign: CampaignType) => {
              campaign["appId"] = "-1";
              return campaign;
            }
          );
          const payload: AnalyticsStateType = {
            //adding all campaigns to each app as I was explained in the response e-mail i got for my questions.
            appData: values[0].map((app: AppDataInterface) => {
              return {
                ...app,
                campaigns,
              };
            }),
            isLoading: false,
            currentApp: undefined,
            errorMessage: null,
          };
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

//TODO global state currentApp i hangi anda atamaliyim? router ile birlikte kullanilmali bir sekilde //
//     useLocation ile pathnamelerden app name i ayni olan app i yakala, useEffect ile render aninda currentApp e ata. //
//TODO sayfa yenilendiginde butun data ucuyor, store useEffect inde api call yapip datayi topluyorum.
//     global state'i local storage'a atsam, her campaign eklemesinde dispatch sonrasinda localstorage'i guncellemem gerekecek.
//     Bu OK bir durum mu? belki cache kullanilabilir. useSWR cache mekanizmasina bak.
//TODO interfaces dosyasina duzenlemen gerek. Component icinde as ile typecasting yapiyorum. ozellikte currentApp icin.
