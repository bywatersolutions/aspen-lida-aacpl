import { Radio } from "native-base";
import React, { useState } from "react";

const Facet_Radio = ({ data, category }) => {
  const [checkedRadio, setCheckedRadio] = useState(null);

  const changeRadio = (e) => {
    setCheckedRadio(e.target.value);
  };

  if (category !== "sort_by") {
    const numOfResults = "(" + data.count + ")";
    return (
      <Radio
        value={data.value}
        accessibilityLabel={data.display}
        name={category}
      >
        {data.display} {numOfResults}
      </Radio>
    );
  }
  return (
    <Radio
      value={data.value}
      accessibilityLabel={data.display}
      name={category}
      style={{ bg: "muted.300" }}
    >
      {data.display}
    </Radio>
  );
};

export default Facet_Radio;
