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

  console.log(plotData);

  return <Line data={plotData}></Line>;
};

export default StractureChart;
