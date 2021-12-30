import { Box, TextField, Typography } from "@mui/material";
import { memo, useCallback, useContext, useMemo, useRef, useState } from "react";
import { useDropArea, useMouseHovered } from "react-use";
import { BaseContext } from "../../../../templates/Provider";
import { useEffectMouseDown } from "./hooks";
import Color from "color";

type ColorType = {
  r: number;
  g: number;
  b: number;
};

function toHex(val: number) {
  return ("00" + val.toString(16)).slice(-2);
}

type CanvasInfo = {
  image: HTMLImageElement;
};

interface Props {}

export const ColorPicker: React.VFC<Props> = memo(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null!);
  const { showMessage } = useContext(BaseContext);
  const [canvasInfo, setCanvasInfo] = useState<CanvasInfo | null>(null);
  const { elX, elY } = useMouseHovered(canvasRef, { whenHovered: true });
  const [color, setColor] = useState<ColorType | null>(null);

  const handleDropFiles = useCallback(
    async (files: File[]) => {
      if (files.length !== 1) return;
      const file = files[0]!;
      if (!file.type.startsWith("image/")) {
        return showMessage("ドロップされたファイルが画像ではありません", "error");
      }
      const result = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.addEventListener("load", () => {
          if (typeof reader.result !== "string") {
            reject("読み込んだファイルが意図しない型です");
            return;
          }
          resolve(reader.result);
        });
        reader.readAsDataURL(file);
      });
      const image = await new Promise<HTMLImageElement>((resolve) => {
        const image = new Image();
        image.addEventListener("load", () => {
          resolve(image);
        });
        image.src = result;
      });
      canvasRef.current.width = image.width;
      canvasRef.current.height = image.height;
      const ctx = canvasRef.current.getContext("2d")!;
      ctx.drawImage(image, 0, 0);
      setCanvasInfo({ image });
    },
    [showMessage]
  );

  const [bond] = useDropArea({
    onFiles: handleDropFiles,
  });

  const [isMouseDown, setIsMouseDown] = useState(false);

  const handleMouseDown = useCallback(() => {
    setIsMouseDown(true);
    const cvs = canvasRef.current;
    const ctx = cvs.getContext("2d")!;
    const data = ctx.getImageData(elX, elY, 1, 1);
    setColor({
      r: data.data[0]!,
      g: data.data[1]!,
      b: data.data[2]!,
    });
  }, [elX, elY]);

  const handleMouseMove = useCallback(() => {
    if (!isMouseDown) {
      return;
    }
    const cvs = canvasRef.current;
    const ctx = cvs.getContext("2d")!;
    const data = ctx.getImageData(elX, elY, 1, 1);
    setColor({
      r: data.data[0]!,
      g: data.data[1]!,
      b: data.data[2]!,
    });
  }, [elX, elY, isMouseDown]);

  const handleMouseUp = useCallback(() => {
    setIsMouseDown(false);
  }, []);

  useEffectMouseDown(isMouseDown, handleMouseMove, handleMouseUp);

  const hsl = useMemo(() => {
    if (color === null) return "";
    return Color.rgb(color.r, color.g, color.b).hsl().string();
  }, [color]);

  return (
    <>
      <Box
        {...bond}
        sx={{
          alignItems: "center",
          bgcolor: "rgb(240, 240, 240)",
          display: "flex",
          justifyContent: "center",
          overflow: "auto",
          minHeight: 256,
          width: "100%",
        }}
      >
        {canvasInfo === null && <Typography>ここに画像ファイルをドラッグ</Typography>}
        <canvas
          ref={canvasRef}
          style={{ display: canvasInfo === null ? "none" : "initial" }}
          onMouseDown={handleMouseDown}
        />
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
        <TextField
          sx={{ width: 256 }}
          value={color === null ? "" : `#${toHex(color.r)}${toHex(color.g)}${toHex(color.b)}`}
        />
        <TextField sx={{ width: 256 }} value={color === null ? "" : `rgba(${color.r}, ${color.g}, ${color.b}, 1.0)`} />
        <TextField sx={{ width: 256 }} value={hsl} />
      </Box>
    </>
  );
});

export default ColorPicker;
