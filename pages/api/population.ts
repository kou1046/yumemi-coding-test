import axios from "axios";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { ResasAPI, PopulationStructure } from "@/lib/types/resas";

const population: NextApiHandler<ResasAPI<PopulationStructure>> = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  const { prefCode } = req.query;

  const response = await axios.get<ResasAPI<PopulationStructure>>(
    "https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear",
    {
      headers: {
        "X-API-KEY": process.env.API_KEY,
      },
      params: {
        prefCode,
        cityCode: "-",
      },
    },
  );
  res.status(200).json(response.data);
};

export default population;
