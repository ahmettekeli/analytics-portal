import { cleanup, render } from "@testing-library/react";
import renderer from "react-test-renderer";
import CardDetail from "../CardDetail";

describe("CardDetail", () => {
  let renderResult: ReturnType<typeof render>;
  const isActive = true;
  const campaignCount = 6;
  const avgInstalls = 53.5;
  const avgRevenue = 107.5;
  beforeEach(() => {
    renderResult = render(
      <CardDetail
        isActive={isActive}
        campaignCount={campaignCount}
        avgInstalls={avgInstalls}
        avgRevenue={avgRevenue}
      />
    );
  });
  afterEach(cleanup);

  test("Renders CardDetail component", () => {
    expect(renderResult.getByTestId("card-detail")).toBeInTheDocument();
  });

  test("Should show campaign count correctly", () => {
    expect(
      renderResult.getAllByText("Campaigns")[0].previousSibling
    ).toHaveTextContent(campaignCount.toString());
  });
  test("Should show Avg. Installs and Avg. Revenue correctly", () => {
    expect(
      renderResult.getAllByText("Avg. Installs")[0].previousSibling
    ).toHaveTextContent(avgInstalls.toString());
    expect(
      renderResult.getAllByText("Avg. Revenue")[0].previousSibling
    ).toHaveTextContent(avgRevenue.toString());
  });

  test("CardDetail matches snapshot", () => {
    const tree = renderer
      .create(
        <CardDetail
          isActive={isActive}
          campaignCount={campaignCount}
          avgInstalls={avgInstalls}
          avgRevenue={avgRevenue}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
