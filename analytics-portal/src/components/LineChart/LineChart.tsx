import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

function LineChart({
  labels,
  dataLabel,
  data,
  color,
}: {
  labels: string[] | undefined;
  dataLabel: string;
  data: string[] | number[] | undefined;
  color: string;
}) {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement
  );
  return (
    <div data-testid="LineChart">
      <Line
        data={{
          labels,
          datasets: [
            {
              label: dataLabel,
              data,
              fill: false,
              borderColor: color,
              tension: 0.5,
            },
          ],
        }}
        height={200}
        width={200}
        options={{
          maintainAspectRatio: false,
        }}
      />
    </div>
  );
}

export default LineChart;
