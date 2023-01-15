import React, { useState, useCallback } from "react";
import { GetStaticProps } from "next";
import axios from "axios";
import {
  PopulationStructure,
  Prefecture,
  PrefectureWithPopulation,
  ResasAPI,
} from "@/lib/types/resas";

import styles from "@/styles/index.module.css";
import StractureChart from "@/lib/components/StructureChart";
import prefectures from "./../public/prefectures.json";

type PageProps = {
  apiKey: string;
  prefectures: Array<Prefecture>;
};

export const getStaticProps: GetStaticProps<PageProps> = async (ctx) => {
  const apiKey = process.env.API_KEY as string;
  const fetcher = axios.create({
    baseURL: "https://opendata.resas-portal.go.jp",
    headers: {
      "X-API-KEY": apiKey,
    },
  });
  // const res = await fetcher.get<ResasAPI<Prefecture>>("/api/v1/prefectures");

  return {
    props: {
      apiKey,
      prefectures: prefectures,
    },
  };
};

const Index = ({ apiKey, prefectures }: PageProps) => {
  const [checkedPrefectures, setcheckedPrefectures] = useState<
    Array<PrefectureWithPopulation>
  >([]);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const clickedPrefecture = prefectures.filter(
      ({ prefName }) => prefName === e.target.value
    )[0];

    if (e.target.checked) {
      const res = await axios.get<ResasAPI<PopulationStructure>>(
        "https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear",

        {
          headers: {
            "X-API-KEY": apiKey,
          },
          params: {
            prefCode: clickedPrefecture.prefCode,
            cityCode: "-",
          },
        }
      );

      const data: PrefectureWithPopulation = {
        prefecture: clickedPrefecture,
        population: res.data.result,
      };

      setcheckedPrefectures((prev) => [...prev, data]);
    } else {
      setcheckedPrefectures((prev) =>
        prev.filter(
          (el) => el.prefecture.prefName !== clickedPrefecture.prefName
        )
      );
    }
  };

  return (
    <>
      <main className={styles.mainContainer}>
        <h4>都道府県</h4>
        <div className={styles.checkboxContainer}>
          {prefectures.map((pre) => (
            <label>
              <input
                type="checkbox"
                value={pre.prefName}
                onChange={handleChange}
              />
              {pre.prefName}
            </label>
          ))}
        </div>
        <h4>人口推移</h4>
        <div className={styles.chartContainer}>
          {checkedPrefectures.length ? (
            <StractureChart prefectures={checkedPrefectures} />
          ) : (
            <p>都道府県を選択してください．</p>
          )}
        </div>
      </main>
    </>
  );
};

export default Index;
