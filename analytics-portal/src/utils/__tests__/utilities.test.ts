import { AppDataInterface, AppInstallInterface } from "../../Interfaces";
import {
  formatDate,
  getAvgInstalls,
  getAvgRevenue,
  generateCampaign,
  getAppChartData,
  getCampaignChartData,
  getRandomValue,
  isNameValid,
  isCampaignPathValid,
} from "../utilities";

describe("Utility functions", () => {
  let app: AppDataInterface = {
    createdAt: new Date(),
    name: "sample name",
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
  it("Should format date", () => {});

  it("Should calculate average installs", () => {
    let average =
      app.installs.reduce((acc, curr) => {
        return acc + curr.value;
      }, 0) / app.installs.length;
    expect(getAvgInstalls(app, app.installs.length)).toBe(average);
  });

  it("Should calculate average revenue", () => {
    let average =
      app.revenue.reduce((acc, curr) => {
        return acc + curr.value;
      }, 0) / app.revenue.length;
    expect(getAvgRevenue(app, app.revenue.length)).toBe(average);
  });

  it("Should validate entered name", () => {
    expect(isNameValid("")).toBe(false);
    expect(isNameValid("test")).toBe(true);
  });
});
