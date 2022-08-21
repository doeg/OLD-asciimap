import { useMapsContext } from "../contexts/maps-context";

export const MapCanvas = () => {
  const { createMap, currentMap, state } = useMapsContext();

  return (
    <div>
      <button onClick={createMap}>New map</button>
      <pre>{JSON.stringify(currentMap, null, 2)}</pre>

      <hr />
      <pre>{JSON.stringify(state.maps, null, 2)}</pre>
    </div>
  );
};
