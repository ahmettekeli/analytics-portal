import { actionTypes } from "./ActionTypes";

export interface AppInstallInterface {
  day: string;
  value: number;
  id: string;
  appId: string;
}

export interface RevenueInterface {
  day: string;
  value: number;
  id: string;
  appId: string;
}

export interface CampaignInstallInterface {
  day: string;
  value: number;
}

export interface AppDataInterface {
  createdAt: Date;
  name: string;
  icon: string;
  active: boolean;
  id: string;
  installs: AppInstallInterface[];
  revenue: RevenueInterface[];
}

export interface CampaignDataInterface {
  name: string;
  installs: CampaignInstallInterface[];
  id: number;
}

export interface AnalyticsStateInterface {
  appData: AppDataInterface[];
  campaignData: CampaignDataInterface[];
  isLoading: boolean;
  errorMessage: string | null;
}

export type AppCampaignType = {
  appData: AppDataInterface[];
  campaignData: CampaignDataInterface[];
};

export interface ContextActionInterface {
  type: actionTypes;
  payload: CampaignDataInterface | AppDataInterface | AppCampaignType;
}

export type AppChartDataType = {
  installLabels: string[];
  installData: number[];
  revenueLabels: string[];
  revenueData: number[];
};

export type CampaignChartDataType = {
  installLabels: string[];
  installData: number[];
};
