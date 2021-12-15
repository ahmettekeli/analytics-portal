export interface InstallInterface {
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

export interface AnalyticsDataInterface {
  createdAt: Date;
  name: string;
  icon: string;
  active: boolean;
  id: string;
  installs: InstallInterface[];
  revenue: RevenueInterface[];
}

export interface AnalyticsStateInterface {
  analyticsData: AnalyticsDataInterface[];
}

export interface ActionInterface {
  type: string;
  payload: any; //TODO: define the payload type
}
