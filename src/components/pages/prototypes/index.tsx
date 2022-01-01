import { Box, Typography } from "@mui/material";
import { memo } from "react";
import SampleUnixDateTime from "../../organisms/articles/2021/2021-12-21/SampleUnixDateTime";
import Amidakuji from "../../organisms/articles/2021/2021-12-23/Amidakuji";
import GameWrapper from "../../organisms/articles/2021/2021-12-23/GameWrapper";
import ColorPicker from "../../organisms/color-picker";
import ConwaysGameOfLife from "../../organisms/life-game/LifeGame";
import SampleOthelloByLocalStorage from "../../organisms/othello/SampleOthelloByLocalStorage";
import SampleOthelloByState from "../../organisms/othello/SampleOthelloByState";

interface Props {
}

export const PrototypesPage: React.VFC<Props> = memo(() => {
  return (
    <Box sx={{ py: 4 }}>
      <Box sx={{ mb: 8 }}>
        <SampleUnixDateTime />
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap", columnGap: 1, justifyContent: "space-between", mb: 8, rowGap: 2 }}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography sx={{ color: (theme) => theme.palette.secondary.main, fontWeight: "bold" }}>State</Typography>
          <SampleOthelloByState />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography sx={{ color: (theme) => theme.palette.secondary.main, fontWeight: "bold" }}>
            LocalStorage
          </Typography>
          <SampleOthelloByLocalStorage />
        </Box>
        <GameWrapper />
      </Box>
      <Box sx={{ mb: 8 }}>
        <Amidakuji />
      </Box>
      <Box sx={{ mb: 8 }}>
        <ConwaysGameOfLife />
      </Box>
      <Box sx={{ mb: 8 }}>
        <ColorPicker />
      </Box>
    </Box>
  );
});

export default PrototypesPage;
