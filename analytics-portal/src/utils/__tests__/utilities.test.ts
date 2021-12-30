import { AppDataInterface } from "Interfaces";
import {
  campaignAlreadyExist,
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
  test("Should format date", () => {});

  test("Should calculate average installs", () => {
    let average =
      app.installs.reduce((acc, curr) => {
        return acc + curr.value;
      }, 0) / app.installs.length;
    expect(getAvgInstalls(app, app.installs.length)).toBe(average);
  });

  test("Should calculate average revenue", () => {
    let average =
      app.revenue.reduce((acc, curr) => {
        return acc + curr.value;
      }, 0) / app.revenue.length;
    expect(getAvgRevenue(app, app.revenue.length)).toBe(average);
  });

  test("Should validate entered name", () => {
    expect(isNameValid("")).toBe(false);
    expect(isNameValid("test")).toBe(true);
  });

  test("Should generate a valid campaign", () => {
    let campaign = generateCampaign("test");
    expect(campaign.name).toBe("test");
    expect(campaign.installs.length).toBe(7);
    expect(campaign.id).toBeTruthy();
  });

  test("Should calculate App chart data", () => {
    let chartData = getAppChartData(app);
    expect(chartData.installLabels.sort()).toEqual(
      app.installs.map((i) => i.day).sort()
    );
    expect(chartData.installData.sort()).toEqual(
      app.installs.map((i) => i.value).sort()
    );
    expect(chartData.revenueLabels.sort()).toEqual(
      app.revenue.map((i) => i.day).sort()
    );
    expect(chartData.revenueData.sort()).toEqual(
      app.revenue.map((i) => i.value).sort()
    );
  });

  test("Should calculate Campaign chart data", () => {
    let campaign = generateCampaign("test");
    let chartData = getCampaignChartData(campaign);
    expect(chartData.installLabels.sort()).toEqual(
      campaign.installs.map((i) => i.day).sort()
    );
    expect(chartData.installData.sort()).toEqual(
      campaign.installs.map((i) => i.value).sort()
    );
  });

  test("Should return a random value", () => {
    expect(getRandomValue(0, 10)).toBeGreaterThanOrEqual(0);
    expect(getRandomValue(0, 10)).toBeLessThanOrEqual(10);
  });

  test("Should return false for a campaign that doesn't exist in any app", () => {
    const appData = [app];
    expect(isCampaignPathValid("test", appData)).toBe(false);
  });

  test("Should return true for a campaign that exists in any app", () => {
    const appData = [app];
    expect(isCampaignPathValid(appData[0].name, appData)).toBe(true);
  });

  test("Should return true when adding a campaign that already exists", () => {
    expect(campaignAlreadyExist(app.campaigns[0].name, app)).toBe(true);
  });

  test("Should return false when adding a campaign that doesn't already exist", () => {
    expect(campaignAlreadyExist("test", app)).toBe(false);
  });

  test("Should format date correctly", () => {
    const date = new Date("2021-11-03T12:33:53.023Z");
    expect(formatDate(date)).toBe("03.11.2021");
  });
});
