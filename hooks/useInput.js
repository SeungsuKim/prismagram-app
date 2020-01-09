import React, { useState } from "react";

const useInput = initialValue => {
  const [value, setValue] = useState(initialValue);

  const onChage = text => setValue(text);

  return { value, onChage };
};

export default useInput;
