import {
  AppDataInterface,
  AppChartDataType,
  CampaignChartDataType,
  CampaignDataInterface,
} from "../context/Interfaces";

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

export function generateCampaign() {
  let campaign = {
    createdAt: new Date(),
    name: "",
    icon: "",
    active: true,
    id: "",
    installs: [],
    revenue: [],
  };
  return campaign;
}

export function getAppChartData(app: AppDataInterface): AppChartDataType {
  console.log({ app });
  return {
    installLabels: app.installs.map((item) => item.day),
    installData: app.installs.map((item) => item.value),
    revenueLabels: app.revenue.map((item) => item.day),
    revenueData: app.revenue.map((item) => item.value),
  };
}

export function getCampaignChartData(
  campaign: CampaignDataInterface
): CampaignChartDataType {
  return {
    installLabels: campaign.installs.map((item) => item.day),
    installData: campaign.installs.map((item) => item.value),
  };
}
