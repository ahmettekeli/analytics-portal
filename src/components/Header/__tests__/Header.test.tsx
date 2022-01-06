import { cleanup, render } from "@testing-library/react";
import renderer from "react-test-renderer";
import Header from "../Header";
import { BrowserRouter as Router } from "react-router-dom";

describe("Header", () => {
  afterEach(cleanup);

  test("Renders Header component", () => {
    const renderResult = render(
      <Router>
        <Header />
      </Router>
    );
    expect(renderResult.getByTestId("Header")).toBeInTheDocument();
  });

  test("Header matches snapshot", () => {
    const tree = renderer
      .create(
        <Router>
          <Header />
        </Router>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
