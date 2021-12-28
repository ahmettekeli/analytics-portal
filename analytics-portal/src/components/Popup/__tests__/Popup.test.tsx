import { render } from "@testing-library/react";
import renderer from "react-test-renderer";
import Popop from "../Popup";

describe("Popop", () => {
  let renderResult: ReturnType<typeof render>;
  const isOpen = true;
  const hide = () => {};
  const onAdd = () => {};

  beforeEach(() => {
    renderResult = render(<Popop isOpen={isOpen} hide={hide} onAdd={onAdd} />);
  });

  test("Renders Popop component", () => {
    expect(renderResult.getByTestId("Popup")).toBeInTheDocument();
  });

  //TODO: fix test
  //   test("Popup matches snapshot", () => {
  //     const tree = renderer
  //       .create(<Popop isOpen={isOpen} hide={hide} onAdd={onAdd} />)
  //       .toJSON();
  //     expect(tree).toMatchSnapshot();
  //   });
});
