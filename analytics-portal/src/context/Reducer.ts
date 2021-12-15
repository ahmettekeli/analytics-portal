import { actionTypes } from "./ActionTypes";
import { AnalyticsStateInterface, ActionInterface } from "./Interfaces";

function Reducer(
  state: AnalyticsStateInterface,
  action: ActionInterface
): AnalyticsStateInterface {
  switch (action.type) {
    case actionTypes.GET_ANALYTICS_DATA:
      return {
        ...state,
        analyticsData: action.payload,
      };
    default:
      return state;
  }
}

export default Reducer;
