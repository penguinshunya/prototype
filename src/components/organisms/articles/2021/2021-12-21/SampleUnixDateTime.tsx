import { Box } from "@mui/system";
import dayjs, { Dayjs } from "dayjs";
import React, { useCallback, useMemo, useState } from "react";
import DayjsDateTimePicker from "../../../../atoms/dayjs-date-time-picker";
import NumberTextField from "../../../../atoms/number-text-field";

interface Props {}

export const SampleUnixDateTime: React.VFC<Props> = () => {
  const [rawValue, setRawValue] = useState(dayjs().startOf("d"));
  const unix = useMemo(() => rawValue.unix(), [rawValue]);
  const date = useMemo(() => rawValue.toDate(), [rawValue]);

  const handleChangeUnix = useCallback((newValue: number | null) => {
    if (newValue === null) return;
    setRawValue(dayjs.unix(newValue));
  }, []);

  const handleChangeDate = useCallback((date: Dayjs | null) => {
    if (date === null) return;
    setRawValue(date);
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
      <DayjsDateTimePicker label="日時" value={date} onChange={handleChangeDate} />
    </Box>
  );
};

export default SampleUnixDateTime;
