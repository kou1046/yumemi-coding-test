import NamedCheckBox from "@/lib/components/NamedCheckBox";
import { Prefecture, ResasAPI } from "@/lib/types/resas";
import axios from "axios";
import { GetStaticProps } from "next";
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
  const [selectedPrefectures, setSelectedPrefectures] = useState<
    Array<Prefecture>
  >([]);

  return (
    <>
      <div>
        {prefectures.map((pre) => (
          <NamedCheckBox label={pre.prefName}></NamedCheckBox>
        ))}
      </div>
    </>
  );
};

export default Index;
