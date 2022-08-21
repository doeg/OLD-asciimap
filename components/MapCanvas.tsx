import { useMapsContext } from "../contexts/maps-context";

export const MapCanvas = () => {
  const { createMap, state } = useMapsContext();

  return (
    <div>
      <button onClick={createMap}>New map</button>
      <pre>{JSON.stringify(state.maps)}</pre>
    </div>
  );
};
