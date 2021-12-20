import { AnalyticsDataInterface } from "../context/Interfaces";

export function isNameValid(name: string): boolean {
  return name.length > 0;
}

export function getAvgRevenue(
  item: AnalyticsDataInterface,
  length: number
): number {
  let avgRevenue: number =
    item.revenue.reduce((acc, rev) => acc + rev.value, 0) / length;
  return Number(avgRevenue.toFixed(2));
}

export function getAvgInstalls(
  item: AnalyticsDataInterface,
  length: number
): number {
  let avgInstalls: number =
    item.installs.reduce((acc, ins) => acc + ins.value, 0) / length;
  return Number(avgInstalls.toFixed(2));
}
