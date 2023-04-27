// מקור    https://github.com/hc-oss/react-multi-select-component

import React, { useEffect, useState } from "react";
import { MultiSelect } from "react-multi-select-component";

const Component_MultiSelect = (props) => {
  
  return (
    <div>
      {props.title && <h4>{`${props.title}`}</h4>}
      <MultiSelect
        options={props.options}
        value={props.selected}
        onChange={props.setSelected}
        labelledBy="Select class"
      />
    </div>
  );
};

export default Component_MultiSelect