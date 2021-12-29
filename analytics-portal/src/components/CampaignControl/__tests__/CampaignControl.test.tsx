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

  it("Renders CampaignControl component", () => {
    expect(renderResult.getByTestId("campaign-control")).toBeInTheDocument();
  });

  it("CampaignControl matches snapshot", () => {
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
