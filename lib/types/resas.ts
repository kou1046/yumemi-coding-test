export type ResasAPI<T> = {
  message: string;
  result: Array<T>;
};

export type Prefecture = {
  prefCode: number;
  prefName: string;
};

export type PopulationStructure = {
  // 人口構成
  boundaryYear: number;
  data: {
    label: string;
    data: Array<{
      year: number;
      value: number;
      rate?: number;
    }>;
  };
};
