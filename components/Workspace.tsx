import { useEffect, useState } from "react";
import { useMapsContext } from "../contexts/maps-context";
import { MapCanvas } from "./MapCanvas";

export const Workspace = () => {
  const { createMap, setState, state } = useMapsContext();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const storedMaps = localStorage.getItem("asciimap");
    if (!storedMaps) return;

    const parsedState = JSON.parse(storedMaps);
    setState(parsedState);
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (isReady) {
      localStorage.setItem("asciimap", JSON.stringify(state));
    }
  }, [state]);

  return (
    <div>
      {state.currentMapID ? (
        <MapCanvas />
      ) : (
        <button onClick={createMap}>Create Map</button>
      )}
    </div>
  );
};
