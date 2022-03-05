import { useState } from "react";

export const useFormFields = (initValue) => {
  const [fields, setFields] = useState(initValue);

  const handleChange = (e) => {
    const { target } = e;

    setFields({ ...fields, [target.name.toLowerCase()]: target.value });
  };

  return { fields, handleChange };
};
