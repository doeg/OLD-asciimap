export type MapLayer = (string | null)[][];

export type MapLegend = {
  [id: string]: {
    background?: string;
    color?: string;
    id: string;
    label?: string;
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
    legend: {
      "#": {
        id: "#",
        symbol: "#",
      },
    },
    layers: [initialLayer],
    title: "Untitled Map",
    updatedAt: Date.now(),
    width: size,
  };
};

export const updateCell = (
  map: ASCIIMap,
  row: number,
  col: number,
  symbolID: string
): ASCIIMap => {
  if (!map.layers) return map;

  const layer = map.layers[0];
  const nextLayer = {
    ...layer,
    [row]: {
      ...layer[row],
      [col]: symbolID,
    },
  };

  return {
    ...map,
    layers: [nextLayer],
  };
};
