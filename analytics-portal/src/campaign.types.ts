import { CampaignInstallInterface } from "Interfaces";

export type CampaignType = {
  name: string;
  installs: CampaignInstallInterface[];
  id: string;
  appId?: string;
};

export type CampaignChartDataType = {
  installLabels: string[];
  installData: number[];
};
