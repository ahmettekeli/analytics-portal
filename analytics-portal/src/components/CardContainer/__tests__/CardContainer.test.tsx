import { cleanup, render } from "@testing-library/react";
import renderer from "react-test-renderer";
import CardContainer from "../CardContainer";
import AnalyticsProvider from "context/Store";

describe("CardContainer", () => {
  let renderResult: ReturnType<typeof render>;
  beforeEach(() => {
    renderResult = render(
      <AnalyticsProvider>
        <CardContainer />
      </AnalyticsProvider>
    );
  });
  afterEach(cleanup);

  test("Should show loading bar when loading", () => {
    expect(renderResult.getByTestId("loading-bar")).toBeInTheDocument();
  });

  // TODO have context store mock with isLoading false;
  test("Renders CardContainer component", () => {});

  test("Renders seperation line between active-inactive apps", () => {});

  test("CardContainer matches snapshot", () => {
    const tree = renderer
      .create(
        <AnalyticsProvider>
          <CardContainer />
        </AnalyticsProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
