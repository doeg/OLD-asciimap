import { useEffect, useState } from "react";

import { createMap, Map, updateTile } from "../utils/map";
import { FilePanel } from "./FilePanel";
import { MapCanvas } from "./MapCanvas";
import { SymbolsPanel } from "./SymbolsPanel";
import style from "./Workspace.module.css";

export const Workspace = () => {
  const [isInitialized, setInitialized] = useState(false);
  const [map, setMap] = useState<Map | null>(null);

  // Load map from localStorage on first mount
  useEffect(() => {
    const mapJSON = localStorage.getItem("asciimap");
    if (!mapJSON) {
      setMap(createMap());
    } else {
      // TODO validation, error handling
      const parsedMap = JSON.parse(mapJSON) as Map;
      setMap(parsedMap);
    }
    setInitialized(true);
  }, []);

  const setAndSaveMap = (nextMap: Map) => {
    setMap(nextMap);
    localStorage.setItem("asciimap", JSON.stringify(nextMap));
  };

  const onClear = () => {
    setAndSaveMap(createMap());
  };

  const onClickCell = (rdx: number, cdx: number) => {
    if (!map || !isInitialized) return;

    // FIXME hardcoded hacks
    const activeSymbolID = map.symbols[0].id;
    const layer = map.layers[0];

    const nextTiles = updateTile(layer.tiles, rdx, cdx, activeSymbolID);
    const nextLayer = { ...layer, tiles: nextTiles };
    const nextMap = {
      ...map,
      layers: [nextLayer],
    };
    setAndSaveMap(nextMap);
  };

  if (!isInitialized) {
    return <div>Loading...</div>;
  }

  if (!map) {
    return null;
  }

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
