import { FunctionComponent, ReactNode } from "react";

import style from "./Panel.module.css";

interface Props {
  children: ReactNode;
  title: string;
}

export const Panel: FunctionComponent<Props> = ({ children, title }) => {
  return (
    <div className={style.panel}>
      <div>{title}</div>
      {children}
    </div>
  );
};
