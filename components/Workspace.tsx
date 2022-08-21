import { useEffect } from "react";
import { useMapsContext } from "../contexts/maps-context";
import { MapCanvas } from "./MapCanvas";

export const Workspace = () => {
  const { createMap, currentMap, state } = useMapsContext();

  useEffect(() => {
    createMap();
  }, []);

  return (
    <div>
      <MapCanvas />
    </div>
  );
};
