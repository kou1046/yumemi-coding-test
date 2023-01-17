import axios from "axios";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { Prefecture, ResasAPI } from "@/lib/types/resas";

const prefectures: NextApiHandler<ResasAPI<Array<Prefecture>>> = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  const response = await axios.get("https://opendata.resas-portal.go.jp/api/v1/prefectures", {
    headers: {
      "X-API-KEY": process.env.API_KEY,
    },
  });
  res.status(200).json(response.data);
};

export default prefectures;
