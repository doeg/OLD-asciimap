import { FunctionComponent, MouseEventHandler } from "react";
import { Map, MapSymbol } from "../utils/map";

import style from "./MapCanvas.module.css";

interface Props {
  map: Map;
  onClickCell: (rdx: number, cdx: number) => void;
}

export const MapCanvas: FunctionComponent<Props> = (props) => {
  const layer = props.map.layers[0];
  if (!layer) return null;

  const symbolsByID = props.map.symbols.reduce((acc, s) => {
    acc[s.id] = s;
    return acc;
  }, {} as { [symbolID: string]: MapSymbol });

  const onClickCell: MouseEventHandler<HTMLDivElement> = ({ target }) => {
    const el = target as HTMLDivElement;

    const rdx = parseInt(el.getAttribute("data-row") as string);
    const cdx = parseInt(el.getAttribute("data-col") as string);

    props.onClickCell(rdx, cdx);
  };

  return (
    <div className={style.grid}>
      {layer.tiles.map((row, rdx) => {
        return (
          <div className={style.row} key={`row${rdx}`}>
            {row.map((cell, cdx) => {
              const key = `row${rdx}-col${cdx}`;
              const symbol = cell?.symbolID ? symbolsByID[cell.symbolID] : null;
              const displaySymbol = symbol ? symbol.character : ".";

              return (
                <div
                  className={style.cell}
                  data-col={cdx}
                  data-row={rdx}
                  key={key}
                  onClick={onClickCell}
                >
                  {displaySymbol}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
