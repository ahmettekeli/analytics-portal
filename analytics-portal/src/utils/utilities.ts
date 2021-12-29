import { v4 as uuidv4 } from "uuid";
import {
  AppDataInterface,
  AppChartDataType,
  CampaignChartDataType,
  CampaignType,
} from "../context/Interfaces";

const dummyCampaignData = [
  { day: "Day 1" },
  { day: "Day 2" },
  { day: "Day 3" },
  { day: "Day 4" },
  { day: "Day 5" },
  { day: "Day 6" },
  { day: "Day 7" },
];

export function isNameValid(name: string): boolean {
  return name.length > 0;
}

export function getAvgRevenue(item: AppDataInterface, length: number): number {
  let avgRevenue: number =
    item.revenue.reduce((acc, rev) => acc + rev.value, 0) / length;
  return Number(avgRevenue.toFixed(2));
}

export function getAvgInstalls(item: AppDataInterface, length: number): number {
  let avgInstalls: number =
    item.installs.reduce((acc, ins) => acc + ins.value, 0) / length;
  return Number(avgInstalls.toFixed(2));
}

export function formatDate(date: Date): string {
  let dateArr = date.toString().split("T")[0].split("-");
  return `${dateArr[2]}.${dateArr[1]}.${dateArr[0]}`;
}

export function getRandomValue(min: number, max: number): number {
  return Math.trunc(Math.random() * (max - min) + min);
}

export function generateCampaign(name: string): CampaignType {
  let installs = dummyCampaignData.map((item) => {
    return {
      day: item.day,
      value: getRandomValue(0, 200),
    };
  });

  return {
    name,
    id: uuidv4(),
    installs,
  };
}

export function getAppChartData(app: AppDataInterface): AppChartDataType {
  return {
    installLabels: app.installs.map((item) => item.day),
    installData: app.installs.map((item) => item.value),
    revenueLabels: app.revenue.map((item) => item.day),
    revenueData: app.revenue.map((item) => item.value),
  };
}

export function getCampaignChartData(
  campaign: CampaignType
): CampaignChartDataType {
  return {
    installLabels: campaign.installs.map((item) => item.day),
    installData: campaign.installs.map((item) => item.value),
  };
}

export function isCampaignPathValid(name: string, appName: string): boolean {
  return name === appName;
}
