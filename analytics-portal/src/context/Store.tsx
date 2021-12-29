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
import useFetch from "useFetch";

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
  const {
    data: appData,
    isError: isAppError,
    isLoading: isAppLoading,
  } = useFetch<AppDataInterface[]>(
    process.env.REACT_APP_APP_ENDPOINT as string
  );
  const {
    data: campaignData,
    isError: isCampaignError,
    isLoading: isCampaignLoading,
  } = useFetch<CampaignType[]>(
    process.env.REACT_APP_CAMPAIGN_ENDPOINT as string
  );

  useEffect(() => {
    let tempAppData: AppDataInterface[] = [];
    let tempCampaignData: CampaignType[] = [];
    if (!isAppLoading && !isAppError) {
      if (!isCampaignLoading && !isCampaignError) {
        //if there is no campaign fetching error, then we can add campaigns to appData
        //Attaching each campaign an appId and giving default campaigns -1 as appId.
        //New campaigns will have the related apps id as appId.
        tempCampaignData = campaignData.map((campaign) => {
          campaign["appId"] = "-1";
          return campaign;
        });
        tempAppData = appData.map((app) => {
          app.campaigns = tempCampaignData;
          return app;
        });
      }
      dispatch({
        type: actionTypes.GET_ANALYTICS_DATA,
        payload: {
          appData: tempAppData,
          isLoading: false,
          errorMessage: null,
          currentApp: undefined,
        },
      });
    } else {
      dispatch({
        type: actionTypes.GET_ANALYTICS_DATA,
        payload: {
          appData: [],
          isLoading: isAppLoading,
          errorMessage: isAppError ? isAppError : null,
          currentApp: undefined,
        },
      });
    }
  }, [
    isAppLoading,
    isAppError,
    appData,
    isCampaignLoading,
    isCampaignError,
    campaignData,
  ]);

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
