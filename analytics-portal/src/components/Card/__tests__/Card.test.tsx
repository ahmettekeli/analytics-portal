import { cleanup, render } from "@testing-library/react";
import renderer from "react-test-renderer";
import Card from "../Card";
import { BrowserRouter as Router } from "react-router-dom";
import { AppDataInterface } from "Interfaces";

describe("Card", () => {
  let renderResult: ReturnType<typeof render>;
  let activeApp: AppDataInterface = {
    createdAt: new Date(),
    name: "Active test app",
    icon: "http://placeimg.com/640/480/abstract",
    active: true,
    id: "1",
    installs: [
      {
        day: "day 1",
        value: 61,
        id: "1",
        appId: "1",
      },
      {
        day: "day 6",
        value: 54,
        id: "6",
        appId: "1",
      },
      {
        day: "day 11",
        value: 88,
        id: "11",
        appId: "1",
      },
      {
        day: "day 16",
        value: 16,
        id: "16",
        appId: "1",
      },
      {
        day: "day 21",
        value: 48,
        id: "21",
        appId: "1",
      },
    ],
    revenue: [
      {
        day: "day 1",
        value: 88,
        id: "1",
        appId: "1",
      },
      {
        day: "day 6",
        value: 79,
        id: "6",
        appId: "1",
      },
      {
        day: "day 11",
        value: 59,
        id: "11",
        appId: "1",
      },
      {
        day: "day 16",
        value: 45,
        id: "16",
        appId: "1",
      },
      {
        day: "day 21",
        value: 16,
        id: "21",
        appId: "1",
      },
    ],
    campaigns: [
      {
        name: "Charlene Kohler",
        installs: [
          {
            day: "Day 1",
            value: 35,
          },
          {
            day: "Day 2",
            value: 15,
          },
          {
            day: "Day 3",
            value: 2,
          },
          {
            day: "Day 4",
            value: 0,
          },
          {
            day: "Day 5",
            value: 1,
          },
          {
            day: "Day 6",
            value: 1,
          },
          {
            day: "Day 7",
            value: 0,
          },
        ],
        id: "1",
      },
    ],
  };
  beforeEach(() => {
    renderResult = render(
      <Router>
        <Card app={activeApp} />
      </Router>
    );
  });
  afterEach(cleanup);

  test("Renders Card component", () => {
    expect(renderResult.getByTestId("card")).toBeInTheDocument();
  });

  //TODO
  test("Renders inactive Card faded", () => {});

  test("Card has correct image and name", () => {
    expect(
      renderResult.getByTestId("card").getElementsByTagName("img")[0].src
    ).toBe(activeApp.icon);
    expect(renderResult.getByText(activeApp.name)).toBeInTheDocument();
  });

  test("Card has correct campaigns value", () => {});
  //TODO
  test("Card has correct avg installs value", () => {});
  //TODO
  test("Card has correct avg revenue value", () => {});
  //TODO

  test("Card matches snapshot", () => {
    const tree = renderer
      .create(
        <Router>
          <Card app={activeApp} />
        </Router>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
