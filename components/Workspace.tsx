import { useEffect, useState } from "react";

import { createMap, Map, updateTile } from "../utils/map";
import { Tools } from "../utils/toolts";
import { FilePanel } from "./FilePanel";
import { MapCanvas } from "./MapCanvas";
import { SymbolsPanel } from "./SymbolsPanel";
import { ToolsPanel } from "./ToolsPanel";
import style from "./Workspace.module.css";

export const Workspace = () => {
  const [isInitialized, setInitialized] = useState(false);
  const [map, setMap] = useState<Map | null>(null);
  const [currentTool, setCurrentTool] = useState<Tools>("draw");

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
    const layer = map.layers[0];

    const activeSymbolID = currentTool === "draw" ? map.symbols[0].id : null;

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
        <ToolsPanel currentTool={currentTool} setCurrentTool={setCurrentTool} />
        <SymbolsPanel map={map} />
      </div>
      <MapCanvas map={map} onClickCell={onClickCell} />
    </div>
  );
};
