import { createContext, Dispatch, ReactNode, useReducer } from "react";
import { AnalyticsDataInterface, AnalyticsStateInterface } from "./Interfaces";
import Reducer from "./Reducer";

const initialState = {
  analyticsData: [] as AnalyticsDataInterface[],
};

//TODO there is a better way to implement context.
export const Context = createContext<{
  state: AnalyticsStateInterface;
  dispatch: Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => null,
});

//TODO make sure you know why you used useReducer here. You already have state and dispatch in Context.
function AnalyticsProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(Reducer, initialState);
  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
}

export default AnalyticsProvider;
