import { TextField, TextFieldProps } from "@mui/material";
import React, { useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";

type Props = Omit<TextFieldProps, "value" | "onBlur" | "onChange"> & {
  value: number | null;
  onChange: (value: number | null) => void;
};

export const NumberTextField: React.VFC<Props> = ({ value, onChange, ...props }) => {
  const [rawValue, setRawValue] = useState("");

  useEffect(() => {
    setRawValue(`${value ?? ""}`);
  }, [value]);

  const handleBlur = useCallback(() => {
    const v = parseInt(rawValue, 10);
    onChange(isNaN(v) ? null : v);
  }, [onChange, rawValue]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setRawValue(e.target.value);
  }, []);

  return <TextField {...props} value={rawValue} onBlur={handleBlur} onChange={handleChange} />;
};

export default NumberTextField;
