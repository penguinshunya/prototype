import { Box, TextField } from "@mui/material";

interface Props {
  color: string | undefined;
}

export const ReadOnlyColorBox: React.VFC<Props> = ({ color }) => {
  return (
    <Box sx={{ display: "grid", gap: 1, gridTemplateColumns: "1fr 40px" }}>
      <TextField fullWidth value={color === undefined ? "" : color} />
      <Box
        sx={{ bgcolor: color === undefined ? "white" : color, border: "1px solid rgba(0, 0, 0, 0.2)", borderRadius: 1 }}
      />
    </Box>
  );
};
