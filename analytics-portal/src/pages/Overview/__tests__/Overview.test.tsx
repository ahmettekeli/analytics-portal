import { render } from "@testing-library/react";
import renderer from "react-test-renderer";
import Overview from "../Overview";

describe("Overview", () => {
  let renderResult: ReturnType<typeof render>;
  beforeEach(() => {
    renderResult = render(<Overview />);
  });
  test("Renders Overview component", () => {
    expect(renderResult.getByTestId("Overview")).toBeInTheDocument();
  });

  test("Renders CardContainer component", () => {
    expect(renderResult.getByTestId("CardContainer")).toBeInTheDocument();
  });

  test("Overview matches snapshot", () => {
    const tree = renderer.create(<Overview />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
