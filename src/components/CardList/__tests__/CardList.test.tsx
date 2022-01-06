import { cleanup, render } from "@testing-library/react";
import { CampaignType } from "campaign.types";
import {
  AppDataInterface,
  AppInstallInterface,
  RevenueInterface,
} from "Interfaces";
import { BrowserRouter as Router } from "react-router-dom";
import renderer from "react-test-renderer";
import CardList from "../CardList";

describe("CardList", () => {
  let renderResult: ReturnType<typeof render>;
  const activeType = "active";
  const inActiveType = "inactive";
  const campaigns: CampaignType[] = [
    {
      id: "1",
      name: "campaign1",
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
          value: 50,
        },
      ],
    },
  ];
  const installs: AppInstallInterface[] = [
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
  ];
  const revenue: RevenueInterface[] = [
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
  ];
  const apps: AppDataInterface[] = [
    {
      createdAt: new Date("12/29/2021"),
      name: "App1",
      icon: "http://placeimg.com/640/480/abstract",
      active: true,
      id: "1",
      installs: installs,
      revenue: revenue,
      campaigns,
    },
  ];
  beforeEach(() => {
    renderResult = render(
      <Router>
        <CardList type={activeType} apps={apps} />
      </Router>
    );
  });
  afterEach(cleanup);

  test("Renders active apps", () => {
    expect(renderResult.getByTestId("active-apps")).toBeInTheDocument();
  });

  test("Renders inactive apps", () => {
    const { getByTestId } = render(
      <Router>
        <CardList type={inActiveType} apps={apps} />
      </Router>
    );
    expect(getByTestId("inactive-apps")).toBeInTheDocument();
  });

  test("CardList matches snapshot", () => {
    const tree = renderer
      .create(
        <Router>
          <CardList type={activeType} apps={apps} />
        </Router>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
