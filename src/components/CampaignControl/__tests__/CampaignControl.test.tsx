import { cleanup, render } from "@testing-library/react";
import renderer from "react-test-renderer";
import CampaignControl from "../CampaignControl";
import { CampaignType } from "campaign.types";

describe("CampaignControl", () => {
  let renderResult: ReturnType<typeof render>;
  const disabled = false;
  const onSelect = jest.fn();
  const onNewCampaign = jest.fn();
  const campaignList: CampaignType[] = [
    {
      id: "1",
      name: "campaign1",
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
          value: 50,
        },
      ],
    },
  ];
  beforeEach(() => {
    renderResult = render(
      <CampaignControl
        campaignList={campaignList}
        onSelect={onSelect}
        onNewCampaign={onNewCampaign}
        disabled={disabled}
      />
    );
  });
  afterEach(cleanup);

  test("Renders CampaignControl component", () => {
    expect(renderResult.getByTestId("campaign-control")).toBeInTheDocument();
  });

  test("Renders new campaign button disabled", () => {});

  test("Should not open popup when new campaign button is clicked if the app is inactive", () => {});

  test("Should fill line chart when campaign is selected from the dropdown", () => {});

  test("Should open popup when new campaign button is clicked", () => {});

  test("Should add campaign to the dropdown when new campaign is added", () => {});

  test("Should render success message when new campaign is added", () => {});

  test("Should close popup after adding campaign", () => {});

  test("Should not add campaign to the dropdown when campaign name already exists in the dropdown", () => {});

  test("Should close popup after trying adding campaign with an existing campaign name", () => {});

  test("Should render error message when new campaign is not added", () => {});

  test("CampaignControl matches snapshot", () => {
    const tree = renderer
      .create(
        <CampaignControl
          campaignList={campaignList}
          onSelect={onSelect}
          onNewCampaign={onNewCampaign}
          disabled={disabled}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
