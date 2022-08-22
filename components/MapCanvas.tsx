import { useCallback, useEffect, useRef, useState } from "react";
import { useMapsContext } from "../contexts/maps-context";
import { updateCell } from "../utils/asciiMap";
import style from "./MapCanvas.module.css";

type SelectedCoords = { [row: number]: { [col: number]: boolean } };

export const MapCanvas = () => {
  const canvasRef = useRef<HTMLDivElement>(null);

  const { currentMap, updateMap } = useMapsContext();
  const [isDragging, setIsDragging] = useState(false);
  const [selectedCoords, setSelectedCoords] = useState<SelectedCoords>([]);

  useEffect(() => {
    canvasRef.current?.addEventListener("selectstart", (e) => {
      e.preventDefault();
    });
  }, [canvasRef.current]);

  const onMouseDown = () => {
    setIsDragging(true);
  };

  const onMouseUp = () => {
    setIsDragging(false);
  };

  const onMouseOver = (e: any, cell: any, row: number, col: number) => {
    if (!currentMap) return;

    if (isDragging) {
      const symbolID = Object.keys(currentMap.legend || {})[0] as string;
      const nextMap = updateCell(currentMap, row, col, symbolID);
      updateMap(nextMap);
    }
  };

  const onClickCell = useCallback(
    (e: any, cell: any, row: number, col: number) => {
      console.log("clicked", cell, row, col, e);
    },
    []
  );

  // FIXME don't hardcode to the first layer
  const layer = currentMap?.layers.length ? currentMap.layers[0] : null;

  if (!layer) return null;

  return (
    <div
      className={style.container}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      ref={canvasRef}
    >
      {layer.map((row, rdx) => (
        <div className={style.row} key={`row${rdx}`}>
          {row.map((_, cdx) => {
            const cell = layer[rdx][cdx];
            console.log(cell);
            return (
              <div
                className={style.cell}
                data-col={cdx}
                data-row={rdx}
                key={`row-${rdx}_col-${cdx}`}
                onClick={(e) => onClickCell(e, cell, rdx, cdx)}
                onMouseOver={(e) => onMouseOver(e, cell, rdx, cdx)}
              >
                {selectedCoords[rdx] && selectedCoords[rdx][cdx] ? "#" : "."}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};
