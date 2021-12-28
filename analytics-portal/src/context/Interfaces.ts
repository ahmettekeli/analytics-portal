import { actionTypes } from "./ActionTypes";

//base interface olusturup app ve campaign icin onlardan turetilebilir.
//2 dosya olsun, app.interface.ts ve campaign.interface.ts
//app.types.ts ve campaign.types.ts olabilir.

//Install interface {
//   day:
//   value:
//   id?:
//   appId?:
// }

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
  campaigns: CampaignType[];
}

export type CampaignType = {
  name: string;
  installs: CampaignInstallInterface[];
  id: string;
  appId?: string;
};

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
