import dotenv from "dotenv";
import { fetchPopulation, fetchPrefectures } from "../utils/api";

const config = dotenv.config({ path: ".env.local" }).parsed;

describe("API test", () => {
  test("prefectures test", async () => {
    const prefectures = await fetchPrefectures(process.env.API_KEY as string);
    expect(prefectures[0].prefCode).toBe(1);
    expect(prefectures[0].prefName).toBe("北海道");
  });

  test("population test", async () => {
    const population = await fetchPopulation(process.env.API_KEY as string, 1);
    expect(population.data[0].label).toBe("総人口");
  });
});
