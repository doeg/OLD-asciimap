import { useMapsContext } from "../contexts/maps-context";
import style from "./MapCanvas.module.css";

export const MapCanvas = () => {
  const { currentMap } = useMapsContext();

  // FIXME don't hardcode to the first layer
  const layer = currentMap?.layers.length ? currentMap.layers[0] : null;
  console.log(currentMap);

  if (!layer) return null;

  return (
    <div className={style.container}>
      {layer.map((row, y) => (
        <div className={style.row}>
          {row.map((cell, x) => (
            <div key={`x${x}-y${y}`}>#</div>
          ))}
        </div>
      ))}
    </div>
  );
};
