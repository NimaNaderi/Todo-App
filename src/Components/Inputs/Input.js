import React from "react";
import { useFormFields } from "../../Hooks/Logic/useFormFields";

export default function Input({ mainData }) {
  const { fields, handleChange } = useFormFields({
    email: "",
    password: "",
  });
  return (
    <input
      name={mainData.name}
      placeholder={mainData.placeholder}
      type={mainData.type}
      onChange={(e) => {
        handleChange(e);
      }}
    />
  );
}
