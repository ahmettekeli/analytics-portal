import { actionTypes } from "./ActionTypes";
import {
  AnalyticsStateType,
  AppDataInterface,
  ContextActionType,
} from "./Interfaces";

function Reducer(
  state: AnalyticsStateType,
  action: ContextActionType
): AnalyticsStateType {
  switch (action.type) {
    case actionTypes.GET_ANALYTICS_DATA:
      return action.payload;
    case actionTypes.SET_CURRENT_APP:
      console.log("SET_CURRENT_APP", action.payload);
      console.log("current app:", action.payload.name);
      return {
        ...state,
        currentApp: action.payload,
      };
    case actionTypes.ADD_CAMPAIGN:
      let { app, campaign } = action.payload;
      let tempApp = state.appData.find((item) => item.id === app.id);
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
    default:
      return state;
  }
}

export default Reducer;
