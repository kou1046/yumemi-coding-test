import { GetStaticProps } from "next";
import React, { useState } from "react";
import PopulationChart from "@/lib/components/PopulationChart";
import { Prefecture, PrefectureWithPopulation } from "@/lib/types/resas";
import { fetchPopulation, fetchPrefectures } from "@/lib/utils/api";
import styles from "@/styles/index.module.css";

type PageProps = {
  apiKey: string;
  prefectures: Array<Prefecture>;
};

export const getStaticProps: GetStaticProps<PageProps> = async (ctx) => {
  const apiKey = process.env.API_KEY as string;
  const prefectures = await fetchPrefectures(apiKey);
  return {
    props: {
      apiKey,
      prefectures,
    },
  };
};

const Index = ({ apiKey, prefectures }: PageProps) => {
  const [checkedPrefectures, setcheckedPrefectures] = useState<Array<PrefectureWithPopulation>>([]);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const clickedPrefecture = prefectures.filter(({ prefName }) => prefName === e.target.value)[0];

    if (e.target.checked) {
      //チェックマークをつけたとき，対象の人口データを取得する
      const population = await fetchPopulation(apiKey, clickedPrefecture.prefCode);

      const data: PrefectureWithPopulation = {
        prefecture: clickedPrefecture,
        population: population,
      };

      setcheckedPrefectures((prev) => [...prev, data]);
    } else {
      //外した時は配列から除外する
      setcheckedPrefectures((prev) =>
        prev.filter((el) => el.prefecture.prefName !== clickedPrefecture.prefName),
      );
    }
  };

  return (
    <>
      <div className={styles.title}>
        <h2>都道府県別総人口推移</h2>
      </div>
      <h4>都道府県</h4>
      <div className={styles.checkboxContainer}>
        {prefectures.map((pre) => (
          <label key={pre.prefName}>
            <input type="checkbox" value={pre.prefName} onChange={handleChange} />
            {pre.prefName}
          </label>
        ))}
      </div>
      <h4>人口推移</h4>
      <div className={styles.chartContainer}>
        <PopulationChart prefectures={checkedPrefectures} />
      </div>
    </>
  );
};

export default Index;
