import { uuid } from "./id";

export interface Map {
  id: string;
  // An ordered array of layers in the map.
  // e.g., Floors of a building, levels of a dungeon.
  layers: MapLayer[];
  // The characters used in the map.
  symbols: MapSymbol[];
}

export interface MapLayer {
  height: number;
  id: string;
  tiles: MapTiles;
  width: number;
}

export type MapTiles = (MapTile | null)[][];

export interface MapTile {
  symbolID: string | null;
}

export interface MapSymbol {
  character: string;
  id: string;
  label?: string | null;
}

export const createMap = (): Map => {
  return {
    id: uuid(),
    layers: [createMapLayer()],
    symbols: [createMapSymbol()],
  };
};

interface CreateMapLayerOpts {
  height?: number;
  size?: number;
  width?: number;
}

const DEFAULT_SIZE = 32;

export const createMapLayer = (opts: CreateMapLayerOpts = {}): MapLayer => {
  const size = typeof opts.size === "number" ? opts.size : DEFAULT_SIZE;
  if (size < 1) {
    throw new Error("Size must be a positive integer >= 1");
  }

  const height = typeof opts.height === "number" ? opts.height : size;
  const width = typeof opts.width === "number" ? opts.width : size;
  if (height < 1 || width < 1) {
    throw new Error("Height and width must be positive integers >= 1");
  }

  return {
    height,
    id: uuid(),
    tiles: createMapTiles({ height, width }),
    width,
  };
};

type CreateMapSymbolOpts = Omit<MapSymbol, "id">;

const DEFAULT_SYMBOL: CreateMapSymbolOpts = {
  character: "#",
  label: "wall",
};

export const createMapSymbol = (
  opts: CreateMapSymbolOpts = DEFAULT_SYMBOL
): MapSymbol => {
  return {
    ...opts,
    id: uuid(),
  };
};

export interface CreateMapTilesOpts {
  height: number;
  width: number;
}

export const createMapTiles = ({
  height,
  width,
}: CreateMapTilesOpts): MapTiles => {
  const tiles = [];
  for (let row = 0; row < height; row++) {
    const cols = [];
    for (let col = 0; col < width; col++) {
      cols[col] = null;
    }
    tiles[row] = cols;
  }
  return tiles;
};

export const updateTile = (
  mapTiles: MapTiles,
  rdx: number,
  cdx: number,
  symbolID: string | null
): MapTiles => {
  if (rdx >= mapTiles.length) {
    throw new Error(
      `row index out of bounds; expected <= ${mapTiles.length - 1}, got ${rdx}`
    );
  }

  const row = mapTiles[rdx];
  if (cdx >= row.length) {
    throw new Error(
      `column index out of bounds; expected <= ${row.length - 1}, got ${cdx}`
    );
  }

  return mapTiles.map((r, rdxx) => {
    if (rdx !== rdxx) return r;

    return r.map((col, cdxx) => {
      if (cdxx !== cdx) return col;
      return { symbolID };
    });
  });
};
