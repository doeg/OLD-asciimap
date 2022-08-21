import {
  createContext,
  FunctionComponent,
  PropsWithChildren,
  useCallback,
  useContext,
  useReducer,
} from "react";

type MapLayer = (string | null)[][];

type MapLegend = {
  [id: string]: {
    background: string;
    color: string;
    label: string;
    symbol: string;
  };
};

interface ASCIIMap {
  createdAt: number;
  height: number;
  id: string;
  legend: MapLegend;
  layers: MapLayer[];
  title: string;
  updatedAt: number;
  width: number;
}

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

  const mapCount = Object.keys(maps).length;

  const createMap = useCallback(() => {
    const createdAt = Date.now();
    const size = 32;

    const initialLayer = new Array(size);
    for (let i = 0; i < size; i++) {
      initialLayer[i] = new Array(size);
      for (let j = 0; j < size; j++) {
        initialLayer[i][j] = null;
      }
    }

    context.dispatch({
      type: "MAPS_CREATE",
      data: {
        createdAt,
        height: size,
        id: `${createdAt}`,
        legend: {},
        layers: [initialLayer],
        title: "Untitled Map",
        updatedAt: Date.now(),
        width: size,
      },
    });
  }, [mapCount]);

  return {
    ...context,
    createMap,
    currentMap,
  };
};
