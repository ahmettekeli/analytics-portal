import { actionTypes } from "./ActionTypes";
import {
  AppCampaignType,
  AnalyticsStateInterface,
  CampaignDataInterface,
  ContextActionInterface,
} from "./Interfaces";

function Reducer(
  state: AnalyticsStateInterface,
  action: ContextActionInterface
): AnalyticsStateInterface {
  switch (action.type) {
    case actionTypes.GET_ANALYTICS_DATA:
      return action.payload as AnalyticsStateInterface;
    case actionTypes.ADD_CAMPAIGN:
      return {
        ...state,
        //TODO campaign eklerken payload tipi ne olacak?
        campaignData: [
          ...state.campaignData,
          action.payload as CampaignDataInterface,
        ],
      };
    default:
      return state;
  }
}

export default Reducer;
