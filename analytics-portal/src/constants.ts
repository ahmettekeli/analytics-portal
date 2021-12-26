export const routes: {
  home: string;
  overview: string;
  details: string;
  notFound: string;
} = {
  home: "/",
  overview: "/overview",
  details: "overview/:name",
  notFound: "/404",
};

export const colors: {
  cardBackground: string;
  cardText: string;
  headerBackground: string;
  headerText: string;
  addButton: string;
  addButtonHover: string;
  inputBorder: string;
  inputBorderFocused: string;
  lineColor: string;
  lineChartColor: string;
  dateText: string;
} = {
  cardBackground: "#eeeeee",
  cardText: "#000000",
  headerBackground: "#D3D3D3",
  headerText: "#000000",
  addButton: "#85C170",
  addButtonHover: "#75E34F",
  inputBorder: "#CFE6C8",
  inputBorderFocused: "#A0EB86",
  lineColor: "#EAEAEA",
  lineChartColor: "#7D7D7D",
  dateText: "#999999",
};

export const urls: {
  apiUrlApp: string;
  apiUrlCampaign: string;
} = {
  apiUrlApp: "https://6183c1af91d76c00172d1b05.mockapi.io/app",
  apiUrlCampaign: "https://6183c1af91d76c00172d1b05.mockapi.io/campaign",
};
