import { render } from "@testing-library/react";
import renderer from "react-test-renderer";
import CardContainer from "../CardContainer";
import AnalyticsProvider from "../../../context/Store";
import { useAPI } from "../../../context/Store";

describe("CardContainer", () => {
  let renderResult: ReturnType<typeof render>;
  const {
    state: { appData, isLoading, errorMessage },
  } = useAPI();
  beforeEach(() => {
    renderResult = render(
      <AnalyticsProvider>
        <CardContainer />
      </AnalyticsProvider>
    );

    console.log("render:", renderResult);
  });

  test("Renders CardContainer component", () => {
    console.log("loading:", isLoading);
    expect(renderResult.getByTestId("CardContainer")).toBeInTheDocument();
  });

  test("Renders active apps container", () => {
    expect(renderResult.getByTestId("ActiveApps")).toBeInTheDocument();
    //global state isLoading false olmali.
    //get dummy test data and compare the amount of card components
  });

  test("Renders inactive apps", () => {
    expect(renderResult.getByTestId("InactiveApps")).toBeInTheDocument();
    //global state isLoading false olmali.
    //compare the amount of card components
  });

  test("Populates the amount of card components for active apps correctly ", () => {
    //global state isLoading false olmali.
    //get dummy test data and compare the amount of card components
  });

  test("Populates the amount of card components for inactive apps correctly ", () => {
    //global state isLoading false olmali.
    //get dummy test data and compare the amount of card components
  });

  test("Renders seperation line between active-inactive apps", () => {
    //global state isLoading false olmali.
    // expect(renderResult.getByTestId("AppSeperationLine")).toBeInTheDocument();
  });

  test("CardContainer matches snapshot", () => {
    const tree = renderer.create(<CardContainer />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
