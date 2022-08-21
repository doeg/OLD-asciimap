import { useCallback, useEffect, useRef, useState } from "react";
import { useMapsContext } from "../contexts/maps-context";
import style from "./MapCanvas.module.css";

type SelectedCoords = { [row: number]: { [col: number]: boolean } };

export const MapCanvas = () => {
  const canvasRef = useRef<HTMLDivElement>(null);

  const { currentMap } = useMapsContext();
  const [isDragging, setIsDragging] = useState(false);
  const [selectedCoords, setSelectedCoords] = useState<SelectedCoords>([]);

  useEffect(() => {
    canvasRef.current?.addEventListener("selectstart", (e) => {
      e.preventDefault();
    });
  }, [canvasRef.current]);

  const onMouseDown = () => {
    console.log("mousedown");
    setIsDragging(true);
  };

  const onMouseUp = () => {
    console.log("mouseup");
    setIsDragging(false);
  };

  const onMouseOver = (e: any, cell: any, row: number, col: number) => {
    if (isDragging) {
      console.log("mouseover", cell, row, col, e);
      setSelectedCoords({
        ...selectedCoords,
        [row]: {
          ...selectedCoords[row],
          [col]: true,
        },
      });
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

  console.log(selectedCoords);

  return (
    <div
      className={style.container}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      ref={canvasRef}
    >
      {layer.map((row, rdx) => (
        <div className={style.row} key={`row${rdx}`}>
          {row.map((cell, cdx) => (
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
          ))}
        </div>
      ))}
    </div>
  );
};
