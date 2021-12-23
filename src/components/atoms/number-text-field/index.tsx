import { TextField, TextFieldProps } from "@mui/material";
import React, { memo, useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";

type Props = Omit<TextFieldProps, "value" | "onBlur" | "onChange"> & {
  value: number | null;
  onChange: (value: number | null) => void;
  isFloat?: boolean;
};

export const NumberTextField: React.VFC<Props> = ({ value, onChange, isFloat, ...props }) => {
  const [rawValue, setRawValue] = useState("");

  useEffect(() => {
    setRawValue(`${value ?? ""}`);
  }, [value]);

  const handleBlur = useCallback(() => {
    const v = isFloat ? parseFloat(rawValue) : parseInt(rawValue, 10);
    onChange(isNaN(v) ? null : v);
  }, [onChange, rawValue, isFloat]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setRawValue(e.target.value);
  }, []);

  return <TextField {...props} value={rawValue} onBlur={handleBlur} onChange={handleChange} />;
};

export default memo(NumberTextField);
