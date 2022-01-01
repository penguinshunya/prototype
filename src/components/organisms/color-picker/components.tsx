import { Box, TextField, Tooltip } from "@mui/material";
import Color from "color";
import { useCallback, useContext } from "react";
import { BaseContext } from "../../templates/Provider";

interface Props {
  color: string | undefined;
}

export const ReadOnlyColorBox: React.VFC<Props> = ({ color }) => {
  const { showMessage } = useContext(BaseContext);

  const handleClick = useCallback(async () => {
    if (color === undefined) {
      return;
    }
    await navigator.clipboard.writeText(color);
    showMessage("クリップボードにコピーしました");
  }, [color, showMessage]);

  return (
    <Box sx={{ display: "grid", gap: 1, gridTemplateColumns: "1fr 36px" }}>
      <TextField
        fullWidth
        value={color === undefined ? "" : color}
        InputProps={{
          readOnly: true,
          sx: {
            fontFamily: "Roboto mono",
            fontSize: 12,
          },
        }}
      />
      <Tooltip title="クリップボードにコピーする">
        <Box
          onClick={handleClick}
          sx={{
            bgcolor: color === undefined ? "white" : color,
            border: "1px solid rgba(0, 0, 0, 0.2)",
            borderRadius: 1,
            cursor: "pointer",
            transition: "background-color 0.1s",
            ":hover": {
              bgcolor: Color(color === undefined ? "white" : color)
                .darken(0.2)
                .string(),
            },
          }}
        />
      </Tooltip>
    </Box>
  );
};
