import { FunctionComponent } from "react";
import { Map } from "../utils/map";
import { Panel } from "./Panel";

interface Props {
  map: Map;
}

export const SymbolsPanel: FunctionComponent<Props> = ({ map }) => {
  return (
    <Panel title="Symbols">
      <ul>
        {map.symbols.map((s) => (
          <li key={s.id}>
            {s.character} {s.label || "Untitled"}
          </li>
        ))}
      </ul>
    </Panel>
  );
};
