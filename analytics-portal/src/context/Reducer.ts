import { actionTypes } from "./ActionTypes";
import {
  AnalyticsStateType,
  AppCampaignType,
  AppDataInterface,
  ContextActionType,
} from "./Interfaces";

const getAnalyticsData = (
  state: AnalyticsStateType,
  action: ContextActionType
) => {
  return action.payload as AnalyticsStateType;
};

const addCampaign = (state: AnalyticsStateType, action: ContextActionType) => {
  const { app, campaign } = action.payload as AppCampaignType;
  const tempApp = state.appData.find((item) => item.id === app.id);
  (tempApp as AppDataInterface).campaigns.push(campaign);
  console.log("tempApp", tempApp?.name, tempApp);
  //Currently adding campaign to all apps then filtering out according to appId of a campaign.
  let modifiedAppData: AppDataInterface[] = state.appData.map((app) => {
    let modifiedApp = app.campaigns.filter(
      (item) => item.appId === app.id || item.appId === "-1"
    );
    return {
      ...app,
      campaigns: modifiedApp,
    };
  });
  return {
    ...state,
    appData: modifiedAppData,
    currentApp: modifiedAppData.find(
      (app) => app.id === (tempApp as AppDataInterface).id
    ) as AppDataInterface,
  };
};

const setCurrentApp = (
  state: AnalyticsStateType,
  action: ContextActionType
) => {
  return {
    ...state,
    currentApp: action.payload,
  } as AnalyticsStateType;
};

export const handlers = {
  [actionTypes.GET_ANALYTICS_DATA]: getAnalyticsData,
  [actionTypes.SET_CURRENT_APP]: setCurrentApp,
  [actionTypes.ADD_CAMPAIGN]: addCampaign,
};

function Reducer(
  state: AnalyticsStateType,
  action: ContextActionType
): AnalyticsStateType {
  if (handlers[action.type]) {
    return handlers[action.type](state, action);
  }
  return state;

  // switch (action.type) {
  //   case actionTypes.GET_ANALYTICS_DATA:
  //     return action.payload;
  //   case actionTypes.SET_CURRENT_APP:
  //     return {
  //       ...state,
  //       currentApp: action.payload,
  //     };
  //   case actionTypes.ADD_CAMPAIGN:
  //     let { app, campaign } = action.payload;
  //     let tempApp = state.appData.find((item) => item.id === app.id);
  //     (tempApp as AppDataInterface).campaigns.push(campaign);
  //     console.log("tempApp", tempApp?.name, tempApp);
  //     //Currently adding campaign to all apps then filtering out according to appId of a campaign.
  //     let modifiedAppData: AppDataInterface[] = state.appData.map((app) => {
  //       let modifiedApp = app.campaigns.filter(
  //         (item) => item.appId === app.id || item.appId === "-1"
  //       );
  //       return {
  //         ...app,
  //         campaigns: modifiedApp,
  //       };
  //     });
  //     return {
  //       ...state,
  //       appData: modifiedAppData,
  //       currentApp: modifiedAppData.find(
  //         (app) => app.id === (tempApp as AppDataInterface).id
  //       ) as AppDataInterface,
  //     };
  //   default:
  //     return state;
  // }
}

export default Reducer;
