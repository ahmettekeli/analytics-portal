import { cleanup, render } from "@testing-library/react";
import renderer from "react-test-renderer";
import OverviewProfile from "../OverviewProfile";
import { BrowserRouter as Router } from "react-router-dom";
import { formatDate } from "utils/utilities";
import { after } from "lodash";

describe("OverviewProfile", () => {
  const imgUrl = "http://placeimg.com/640/480/abstract";
  const name = "Test";
  const creationDate = new Date("2021-11-03T12:33:53.023Z");
  let renderResult: ReturnType<typeof render>;

  beforeEach(() => {
    renderResult = render(
      <Router>
        <OverviewProfile
          imgUrl={imgUrl}
          name={name}
          creationDate={formatDate(creationDate)}
        />
      </Router>
    );
  });

  afterEach(cleanup);

  test("Renders OverviewProfile component", () => {
    expect(renderResult.getByTestId("OverviewProfile")).toBeInTheDocument();
  });

  test("Has correct profile image", () => {
    expect(
      renderResult.getByTestId("OverviewProfile").getElementsByTagName("img")[0]
        .src
    ).toBe(imgUrl);
  });

  test("Has correct name", () => {});
  //TODO
  test("Has correct created at date", () => {});
  //TODO
  test("OverviewProfile matches snapshot", () => {
    const tree = renderer
      .create(
        <Router>
          <OverviewProfile
            imgUrl={imgUrl}
            name={name}
            creationDate={formatDate(creationDate)}
          />
        </Router>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
