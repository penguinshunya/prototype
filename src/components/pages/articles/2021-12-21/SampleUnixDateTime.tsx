import { DateTimePicker } from "@mui/lab";
import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import dayjs from "dayjs";
import React, { useCallback, useMemo, useState } from "react";
import NumberTextField from "../../../atoms/number-text-field";

interface Props {}

export const SampleUnixDateTime: React.VFC<Props> = () => {
  const [rawValue, setRawValue] = useState(dayjs());
  const unix = useMemo(() => rawValue.unix(), [rawValue]);
  const date = useMemo(() => rawValue.toDate(), [rawValue]);

  const handleChangeUnix = useCallback((newValue: number | null) => {
    if (newValue === null) return;
    setRawValue(dayjs.unix(newValue));
  }, []);

  const handleChangeDate = useCallback((newValue: Date | null) => {
    if (newValue === null) return;
    setRawValue(dayjs(newValue));
  }, []);

  return (
    <Box
      sx={{
        alignItems: "center",
        columnGap: 1,
        display: "flex",
      }}
    >
      <NumberTextField label="UNIX時間" value={unix} onChange={handleChangeUnix} />
      <div>↔</div>
      <DateTimePicker
        label="日時"
        value={date}
        mask="____/__/__ __:__:__"
        inputFormat="YYYY/MM/DD HH:mm:ss"
        onChange={handleChangeDate}
        views={["year", "month", "day", "hours", "minutes", "seconds"]}
        renderInput={(params) => (
          <TextField
            {...params}
            sx={{
              minWidth: 256,
            }}
          />
        )}
      />
    </Box>
  );
};

export default SampleUnixDateTime;
