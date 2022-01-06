import { cleanup, render } from "@testing-library/react";
import renderer from "react-test-renderer";
import CardProfile from "../CardProfile";

describe("CardProfile", () => {
  let renderResult: ReturnType<typeof render>;
  const src = "http://placeimg.com/640/480/abstract";
  const isActive = true;
  const name = "Test app";

  beforeEach(() => {
    renderResult = render(
      <CardProfile isActive={isActive} src={src} name={name} />
    );
  });
  afterEach(cleanup);

  test("Renders CardProfile", () => {
    expect(renderResult.getByTestId("card-profile")).toBeInTheDocument();
  });

  test("Displays correct image", () => {
    expect(renderResult.getByAltText(name)).toHaveAttribute("src", src);
  });

  test("Displays correct name", () => {
    expect(renderResult.getByText(name)).toBeInTheDocument();
  });

  test("CardProfile matches snapshot", () => {
    const tree = renderer
      .create(<CardProfile isActive={isActive} src={src} name={name} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
