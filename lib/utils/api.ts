import axios from "axios";
import { ResasAPI, PopulationStructure, Prefecture } from "../types/resas";

export const fetchPopulation = async (apiKey: string, prefCode: number) => {
  const res = await axios.get<ResasAPI<PopulationStructure>>(
    "https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear",

    {
      headers: {
        "X-API-KEY": apiKey,
      },
      params: {
        prefCode,
        cityCode: "-",
      },
    }
  );
  return res.data.result;
};

export const fetchPrefectures = async (apiKey: string) => {
  const res = await axios.get<ResasAPI<Array<Prefecture>>>(
    "https://opendata.resas-portal.go.jp/api/v1/prefectures",
    {
      headers: {
        "X-API-KEY": apiKey,
      },
    }
  );
  return res.data.result;
};
