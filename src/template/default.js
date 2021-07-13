exports.content = `import React, { FC, useState, useEffect } from "react";
import { Button } from "antd";

import S from "./index.less"

const ComponentName: FC<{}> = ({}) => {
  return <div className={S.container}>content</div>;
};

export default ComponentName;
`;

exports.style = `.container {
    position: relative;
}
`
