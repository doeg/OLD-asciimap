export type MapLayer = (string | null)[][];

export type MapLegend = {
  [id: string]: {
    background: string;
    color: string;
    label: string;
    symbol: string;
  };
};

export interface ASCIIMap {
  createdAt: number;
  height: number;
  id: string;
  legend: MapLegend;
  layers: MapLayer[];
  title: string;
  updatedAt: number;
  width: number;
}

export interface CreateMapOpts {}

export const createMap = (opts: CreateMapOpts = {}): ASCIIMap => {
  const createdAt = Date.now();
  const size = 32;

  const initialLayer = new Array(size);
  for (let i = 0; i < size; i++) {
    initialLayer[i] = new Array(size);
    for (let j = 0; j < size; j++) {
      initialLayer[i][j] = null;
    }
  }

  return {
    createdAt,
    height: size,
    id: `${createdAt}`,
    legend: {},
    layers: [initialLayer],
    title: "Untitled Map",
    updatedAt: Date.now(),
    width: size,
  };
};
