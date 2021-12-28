import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import renderer from "react-test-renderer";
import Home from "../Home";

describe("Home", () => {
  let renderResult: ReturnType<typeof render>;
  beforeEach(() => {
    renderResult = render(
      <Router>
        <Home />
      </Router>
    );
  });
  test("Renders Home component", () => {
    expect(renderResult.getByTestId("Home")).toBeInTheDocument();
  });

  test("Overview button redirects to Overview page", () => {
    const overviewButton = renderResult.getByText("Overview");
    overviewButton.click();
    expect(window.location.pathname).toBe("/overview");
  });

  test("Home matches snapshot", () => {
    const tree = renderer
      .create(
        <Router>
          <Home />
        </Router>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
