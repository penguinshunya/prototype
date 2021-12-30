import { Box, Button, Typography } from "@mui/material";
import _ from "lodash";
import { memo, useCallback, useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { BaseContext } from "../../../../templates/Provider";

const COUNT = 5;

interface Props {}

export const UUIDCreate: React.VFC<Props> = memo(() => {
  const { showMessage } = useContext(BaseContext);
  const [values, setValues] = useState<string[]>(_.range(COUNT).map(() => uuidv4()));

  const handleClick = useCallback(() => {
    setValues(_.range(COUNT).map(() => uuidv4()));
  }, []);

  const handleClickLi = useCallback(
    async (uuid: string) => {
      await navigator.clipboard.writeText(uuid);
      showMessage("クリップボードにコピーしました");
    },
    [showMessage]
  );

  return (
    <Box sx={{ display: "grid", gap: 1 }}>
      <Box sx={{ alignItems: "center", display: "flex", flexWrap: "wrap", gap: 1 }}>
        <Button size="small" variant="contained" onClick={handleClick}>
          UUIDを{COUNT}個生成する
        </Button>
        <Typography sx={{ fontSize: 10 }}>クリックでクリップボードにコピー</Typography>
      </Box>
      <Box component="ul" sx={{ overflow: "auto", width: "100%" }}>
        {values.map((v) => (
          <Box
            key={v}
            component="li"
            sx={{
              color: "#a0a0a0",
              cursor: "pointer",
              fontFamily: '"Roboto Mono", "Source Code Pro", monospace',
              whiteSpace: "nowrap",
              width: "max-content",
              ":hover": {
                color: "black",
                textDecoration: "underline",
              },
            }}
            onClick={() => handleClickLi(v)}
          >
            {v}
          </Box>
        ))}
      </Box>
    </Box>
  );
});

export default UUIDCreate;
