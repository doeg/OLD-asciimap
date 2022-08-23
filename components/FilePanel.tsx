import { FunctionComponent } from "react";
import { Panel } from "./Panel";

interface Props {
  onClear: () => void;
}

export const FilePanel: FunctionComponent<Props> = ({ onClear }) => {
  return (
    <Panel title="File">
      <button onClick={onClear}>Clear Map</button>
    </Panel>
  );
};
