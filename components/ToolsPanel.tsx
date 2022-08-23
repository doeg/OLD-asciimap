import { FunctionComponent } from "react";
import { Tools } from "../utils/toolts";
import { Panel } from "./Panel";

interface Props {
  currentTool: Tools;
  setCurrentTool: (tool: Tools) => void;
}

export const ToolsPanel: FunctionComponent<Props> = ({
  currentTool,
  setCurrentTool,
}) => {
  return (
    <Panel title="Tools">
      <div className="vstack">
        <button className="mb-1" onClick={() => setCurrentTool("draw")}>
          {currentTool === "draw" && "*"}Draw
        </button>
        <button className="mb-1" onClick={() => setCurrentTool("erase")}>
          {currentTool === "erase" && "*"}Erase
        </button>
      </div>
    </Panel>
  );
};
