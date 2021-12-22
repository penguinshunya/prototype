import { Box, Button, Typography } from "@mui/material";
import _ from "lodash";
import { memo, useCallback, useMemo } from "react";
import { useLocalStorage } from "react-use";

const KEY = "616f0d51-d895-9257-f114-f23a926f302a";

interface ValueType {
  id: number;
  name: string;
  count?: number;
}

function initValue(): ValueType {
  return { id: 1, name: "takaya", count: 0 };
}

interface Props {}

export const SampleLocalStorage: React.VFC<Props> = memo(() => {
  const [value, setValue] = useLocalStorage<ValueType>(KEY, initValue());

  const handleClick = useCallback(() => {
    if (value === undefined) return;
    setValue({
      id: (value.id % 32) + 1,
      name: value.name.substring(1) + value.name.substring(0, 1),
      count: (value.count ?? 0) + 1,
    });
  }, [value, setValue]);

  const handleClickReset = useCallback(() => {
    setValue(initValue());
  }, [setValue]);

  const canReset = useMemo(() => {
    return !_.isEqual(value, initValue());
  }, [value]);

  return (
    <Box sx={{ alignItems: "center", display: "flex", gap: 1 }}>
      <Button variant="contained" onClick={handleClick} size="small">
        Click Me!
      </Button>
      <Button color="error" disabled={!canReset} variant="contained" onClick={handleClickReset} size="small">
        Reset!
      </Button>
      <Box sx={{ alignItems: "center", display: "flex", gap: 1 }}>
        <Typography>
          id: {value?.id ?? "-"}, name: {value?.name ?? "-"}, count: {value?.count ?? "-"}
        </Typography>
      </Box>
    </Box>
  );
});

export default memo(SampleLocalStorage);
