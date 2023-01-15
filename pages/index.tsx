import React from "react";
import { GetStaticProps } from "next";
import axios from "axios";

import { Prefecture, ResasAPI } from "@/lib/types/resas";
import styles from "@/styles/index.module.css";
import { useState } from "react";
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
    Array<Prefecture>
  >([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const clickedPrefecture = prefectures.filter(
      ({ prefName }) => prefName === e.target.value
    )[0];

    if (e.target.checked) {
      setcheckedPrefectures((prev) => [...prev, clickedPrefecture]);
    } else {
      setcheckedPrefectures((prev) =>
        prev.filter((pre) => pre !== clickedPrefecture)
      );
    }
  };

  return (
    <>
      <main className={styles.mainContainer}>
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
      </main>
    </>
  );
};

export default Index;
