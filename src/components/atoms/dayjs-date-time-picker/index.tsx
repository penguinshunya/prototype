import { DateTimePicker, DateTimePickerProps } from "@mui/lab";
import { TextField } from "@mui/material";
import { Dayjs } from "dayjs";
import { memo } from "react";

type Props = Omit<DateTimePickerProps<Dayjs>, "inputFormat" | "mask" | "renderInput" | "views">;

export const DayjsDateTimePicker: React.VFC<Props> = ({ ...props }) => {
  return (
    <DateTimePicker
      {...props}
      inputFormat="YYYY/MM/DD HH:mm:ss"
      mask="____/__/__ __:__:__"
      renderInput={(params) => <TextField {...params} />}
      views={["year", "month", "day", "hours", "minutes", "seconds"]}
    />
  );
};

export default memo(DayjsDateTimePicker);
