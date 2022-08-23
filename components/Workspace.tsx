import { useState } from "react";

import { createMap, Map, updateTile } from "../utils/map";
import { FilePanel } from "./FilePanel";
import { MapCanvas } from "./MapCanvas";
import { SymbolsPanel } from "./SymbolsPanel";
import style from "./Workspace.module.css";

export const Workspace = () => {
  const [map, setMap] = useState<Map>(createMap());

  const onClear = () => {
    setMap(createMap());
  };

  const onClickCell = (rdx: number, cdx: number) => {
    // FIXME hardcoded hacks
    const activeSymbolID = map.symbols[0].id;
    const layer = map.layers[0];

    const nextTiles = updateTile(layer.tiles, rdx, cdx, activeSymbolID);
    const nextLayer = { ...layer, tiles: nextTiles };
    const nextMap = {
      ...map,
      layers: [nextLayer],
    };
    setMap(nextMap);
  };

  return (
    <div className={style.container}>
      <div className={style.sidebar}>
        <FilePanel onClear={onClear} />
        <SymbolsPanel map={map} />
      </div>
      <MapCanvas map={map} onClickCell={onClickCell} />
    </div>
  );
};
