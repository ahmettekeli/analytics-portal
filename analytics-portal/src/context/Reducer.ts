import { actionTypes } from "./ActionTypes";
import {
  AnalyticsStateInterface,
  AnalyticsStateType,
  AppDataInterface,
  ContextActionType,
} from "./Interfaces";

function Reducer(
  // state: AnalyticsStateInterface,
  state: AnalyticsStateType,
  action: ContextActionType
  // ): AnalyticsStateInterface {
): AnalyticsStateType {
  switch (action.type) {
    case actionTypes.GET_ANALYTICS_DATA:
      return action.payload;
    case actionTypes.SET_CURRENT_APP:
      console.log("SET_CURRENT_APP", action.payload);
      return {
        ...state,
        currentApp: action.payload,
      };
    case actionTypes.ADD_CAMPAIGN:
      let { app, campaign } = action.payload;
      let index = state.appData.indexOf(app);
      state.appData[index].campaigns.push(campaign);
      //Currently adding campaign to all apps then filtering out according to appId of a campaign.
      let modifiedAppData = state.appData.map((app) => {
        let modifiedApp = app.campaigns.filter(
          (item) => item.appId === app.id || item.appId === "-1"
        );
        return { ...app, campaigns: modifiedApp };
      });
      return {
        ...state,
        appData: modifiedAppData,
      };
    default:
      return state;
  }
}

export default Reducer;
