import type { FunctionComponent } from "react";
import htmlData from "./htmlData";

const OliWrapper:FunctionComponent = () => {
  return <div dangerouslySetInnerHTML={{__html: htmlData.data}}/>;
};

export default OliWrapper;
