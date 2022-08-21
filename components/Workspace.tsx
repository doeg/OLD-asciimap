import { useMapsContext } from "../contexts/maps-context";
import { MapCanvas } from "./MapCanvas";

export const Workspace = () => {
  const { createMap, currentMap, state } = useMapsContext();

  return (
    <div>
      <button onClick={createMap}>New map</button>
      <MapCanvas />
      <hr />
      <pre>{JSON.stringify(state.maps, null, 2)}</pre>
    </div>
  );
};
