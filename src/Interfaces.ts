import { actionTypes } from "./context/ActionTypes";
import { CampaignType } from "campaign.types";

export interface InstallInterface {
  day: string;
  value: number;
  id?: string;
  appId?: string;
}

export interface AppInstallInterface extends InstallInterface {}

export interface RevenueInterface {
  day: string;
  value: number;
  id: string;
  appId: string;
}

export interface CampaignInstallInterface extends InstallInterface {}

export interface AppDataInterface {
  createdAt: Date;
  name: string;
  icon: string;
  active: boolean;
  id: string;
  installs: AppInstallInterface[];
  revenue: RevenueInterface[];
  campaigns: CampaignType[];
}

export type AnalyticsStateType =
  | {
      appData: AppDataInterface[];
      currentApp: AppDataInterface;
      isLoading: boolean;
      errorMessage: string;
    }
  | {
      appData: AppDataInterface[];
      currentApp: AppDataInterface | undefined;
      isLoading: boolean;
      errorMessage: null;
    };

export type AppCampaignType = {
  app: AppDataInterface;
  campaign: CampaignType;
};

export type ContextActionType =
  | { type: actionTypes.GET_ANALYTICS_DATA; payload: AnalyticsStateType }
  | {
      type: actionTypes.ADD_CAMPAIGN;
      payload: AppCampaignType;
    }
  | {
      type: actionTypes.SET_CURRENT_APP;
      payload: AppDataInterface;
    };
