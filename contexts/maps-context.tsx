import {
  createContext,
  FunctionComponent,
  PropsWithChildren,
  useCallback,
  useContext,
  useReducer,
} from "react";
import { ASCIIMap } from "../utils/asciiMap";
import * as utils from "../utils/asciiMap";

interface MapsState {
  currentMapID: string | null;
  maps: { [mapID: string]: ASCIIMap };
}

const EMPTY_STATE: MapsState = {
  currentMapID: null,
  maps: {},
};

type Action = { type: "MAPS_CREATE"; data: ASCIIMap };

type Dispatch = (action: Action) => void;

type MapsContextType = { state: MapsState; dispatch: Dispatch };

const MapsContext = createContext<MapsContextType | undefined>(undefined);

const mapsReducer = (state: MapsState, action: Action): MapsState => {
  switch (action.type) {
    case "MAPS_CREATE":
      return {
        ...state,
        currentMapID: action.data.id,
        maps: {
          ...state.maps,
          [action.data.id]: action.data,
        },
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export const MapsContextProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(mapsReducer, EMPTY_STATE);
  const value: MapsContextType = { state, dispatch };
  return <MapsContext.Provider value={value}>{children}</MapsContext.Provider>;
};

interface UseMapsContext extends MapsContextType {
  createMap: () => void;
  currentMap: ASCIIMap | null;
}

export const useMapsContext = (): UseMapsContext => {
  const context = useContext(MapsContext);
  if (context === undefined) {
    throw new Error("useCount must be used within a CountProvider");
  }

  const { currentMapID, maps } = context.state;

  const currentMap =
    currentMapID && currentMapID in maps ? maps[currentMapID] : null;

  const createMap = useCallback(() => {
    context.dispatch({
      type: "MAPS_CREATE",
      data: utils.createMap(),
    });
  }, []);

  return {
    ...context,
    createMap,
    currentMap,
  };
};
