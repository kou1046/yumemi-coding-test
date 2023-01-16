import { Chart } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { PrefectureWithPopulation } from "../types/resas";

type Props = {
  prefectures: Array<PrefectureWithPopulation>;
};

Chart.register();

const PopulationChart = ({ prefectures }: Props) => {
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
          text: "時間 (年)",
          color: "black",
        },
      },
      y: {
        ticks: {
          color: "black",
        },
        title: {
          display: true,
          text: "総人口 (人)",
          color: "black",
        },
      },
    },
  };

  if (!prefectures.length) {
    const plotData = {
      labels: [],
      datasets: [],
    };
    return <Line data={plotData} options={options} />;
  }

  const plotData = {
    labels: prefectures[0].population.data[0].data.map(({ year }) => year),
    datasets: prefectures.map((el) => ({
      label: el.prefecture.prefName,
      data: el.population.data[0].data.map(({ value }) => value),
      borderWidth: 1.5,
      pointRadius: 1.5,
    })),
  };

  return <Line data={plotData} options={options}></Line>;
};

export default PopulationChart;
