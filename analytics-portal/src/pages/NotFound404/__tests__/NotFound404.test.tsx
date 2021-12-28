import { render } from "@testing-library/react";
import renderer from "react-test-renderer";
import NotFound404 from "../NotFound404";

describe("NotFound404", () => {
  test("Renders NotFound404 component", () => {
    const renderResult = render(<NotFound404 />);
    expect(renderResult.getByTestId("NotFound404")).toBeInTheDocument();
  });

  test("NotFound404 matches snapshot", () => {
    const tree = renderer.create(<NotFound404 />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
