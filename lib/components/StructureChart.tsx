import { Chart } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { PrefectureWithPopulation } from "../types/resas";

type Props = {
  prefectures: Array<PrefectureWithPopulation>;
};

Chart.register();

const StractureChart = ({ prefectures }: Props) => {
  if (!prefectures.length) return null;

  const plotData = {
    labels: prefectures[0].population.data[0].data.map(({ year }) => year),
    datasets: prefectures.map((el) => ({
      label: el.prefecture.prefName,
      data: el.population.data[0].data.map(({ value }) => value),
    })),
  };

  const options: any = {
    maintainAspectRatio: false,
    plugins: {
      colors: {
        forceOverride: true,
      },
    },
    scales: {
      x: {
        ticks: {
          color: "black",
        },
        title: {
          display: true,
          text: "Year",
          color: "black",
        },
      },
      y: {
        ticks: {
          color: "black",
        },
        title: {
          display: true,
          text: "Total population",
          color: "black",
        },
      },
    },
  };

  return <Line data={plotData} options={options}></Line>;
};

export default StractureChart;
