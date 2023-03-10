export type ResasAPI<T> = {
  message: string;
  result: T;
};

export type Prefecture = {
  prefCode: number;
  prefName: string;
};

export type PopulationStructure = {
  // 人口構成
  boundaryYear: number;
  data: Array<{
    label: string;
    data: Array<{
      year: number;
      value: number;
      rate?: number;
    }>;
  }>;
};

export type PrefectureWithPopulation = {
  prefecture: Prefecture;
  population: PopulationStructure;
};
