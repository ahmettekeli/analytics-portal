import { render } from "@testing-library/react";
import renderer from "react-test-renderer";
import LineChart from "../LineChart";
import { colors } from "../../../constants";

describe("LineChart", () => {
  const testLabels = ["day 1", "day 2", "day 3", "day 4", "day 5"];
  const testDataLabel = "Installs";
  const testData = [10, 20, 60, 30, 90];
  let renderResult: ReturnType<typeof render>;

  beforeEach(() => {
    renderResult = render(
      <LineChart
        labels={testLabels}
        dataLabel={testDataLabel}
        data={testData}
        color={colors.lineChartColor}
      />
    );
  });

  test("Renders LineChart component", () => {
    expect(renderResult.getByTestId("LineChart")).toBeInTheDocument();
  });

  test("LineChart matches snapshot", () => {
    const tree = renderer
      .create(
        <LineChart
          labels={testLabels}
          dataLabel={testDataLabel}
          data={testData}
          color={colors.lineChartColor}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
