import { Box, Button, MenuItem, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Color from "color";
import dayjs from "dayjs";
import { memo, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useDropArea, useLocalStorage, useMouseHovered } from "react-use";
import { v4 } from "uuid";
import { BaseContext } from "../../../../../templates/Provider";
import { ReadOnlyColorBox } from "./components";
import { useEffectMouseDown } from "./hooks";

type ColorType = {
  r: number;
  g: number;
  b: number;
  a?: number;
};

function toHex(val: number) {
  return ("00" + val.toString(16)).slice(-2);
}

interface RawCanvasInfo {
  id: string;
  imageURL: string;
  created: number;
}

const KEY_COLOR = "5f4a8e75-6dd3-40e3-bef3-14ebc06f5c45";
const KEY_IMAGES = "516318e5-36b0-4ed4-926f-15d644c185a2";
const KEY_SELECTED_ID = "80ba0598-6994-45df-8282-d635f590c1b5";

interface Props {}

export const ColorPicker: React.VFC<Props> = memo(() => {
  const theme = useTheme();
  const isSM = useMediaQuery(theme.breakpoints.down("sm"));

  const canvasRef = useRef<HTMLCanvasElement>(null!);
  const { showMessage } = useContext(BaseContext);
  const { elX, elY } = useMouseHovered(canvasRef, { whenHovered: true });
  const [rawColor, setColor] = useLocalStorage<ColorType | null>(KEY_COLOR, null);
  const color = useMemo(() => rawColor ?? null, [rawColor]);

  const [images, setImages] = useLocalStorage<RawCanvasInfo[]>(KEY_IMAGES, []);
  const [selectedImageID, setSelectedImageID] = useLocalStorage<string | null>(KEY_SELECTED_ID, null);
  const [loading, setLoading] = useState(false);

  const addAndRemoveImages = useCallback(
    (image: RawCanvasInfo) => {
      if (images === undefined) {
        return;
      }
      const imgs = [image, ...images];
      if (imgs.length > 32) imgs.length = 32;
      setImages(imgs);
    },
    [images, setImages]
  );

  const loadImage = useCallback(async (url: string) => {
    setLoading(true);
    const image = await new Promise<HTMLImageElement>((resolve) => {
      const image = new Image();
      image.addEventListener("load", () => {
        resolve(image);
      });
      image.src = url;
    });
    setLoading(false);
    canvasRef.current.width = image.width;
    canvasRef.current.height = image.height;
    const ctx = canvasRef.current.getContext("2d")!;
    ctx.drawImage(image, 0, 0);
  }, []);

  const handleDropFiles = useCallback(
    async (files: File[]) => {
      if (files.length !== 1) return;
      const file = files[0]!;
      if (!file.type.startsWith("image/")) {
        return showMessage("画像ファイルではありません", "error");
      }
      setLoading(true);
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
      setLoading(false);
      const id = v4();
      addAndRemoveImages({ id, imageURL: result, created: dayjs().unix() });
      setSelectedImageID(id);
    },
    [addAndRemoveImages, setSelectedImageID, showMessage]
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
      a: data.data[3]! / 255,
    });
  }, [elX, elY, setColor]);

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
      a: data.data[3]! / 255,
    });
  }, [elX, elY, isMouseDown, setColor]);

  const handleMouseUp = useCallback(() => {
    setIsMouseDown(false);
  }, []);

  useEffectMouseDown(isMouseDown, handleMouseMove, handleMouseUp);

  const colors = useMemo(() => {
    if (color === null) return null;
    const hex = `#${toHex(color.r)}${toHex(color.g)}${toHex(color.b)}`;
    const alpha = color.a ?? 1;
    const hsl = (() => {
      const t = Color.rgb(color.r, color.g, color.b, alpha).hsl();
      const h = Math.round(t.hue() * 10) / 10;
      const s = Math.round(t.saturationl());
      const l = Math.round(t.lightness());
      const a = Math.round(t.alpha() * 100) / 100;
      return `hsla(${h}, ${s}%, ${l}%, ${a})`;
    })();
    const rgb = `rgb(${color.r}, ${color.g}, ${color.b}, ${Math.round(alpha * 100) / 100})`;
    return { hex, hsl, rgb };
  }, [color]);

  const handleClickMenuItem = useCallback(
    async (id: string) => {
      if (selectedImageID === id) {
        setSelectedImageID(null);
      } else {
        setSelectedImageID(id);
      }
    },
    [selectedImageID, setSelectedImageID]
  );

  const selectedImage = useMemo(() => {
    if (selectedImageID === null) {
      return null;
    }
    const img = images?.filter((i) => i.id === selectedImageID)[0];
    return img ?? null;
  }, [images, selectedImageID]);

  useEffect(() => {
    if (selectedImage === null) {
      return;
    }
    loadImage(selectedImage.imageURL);
  }, [loadImage, selectedImage]);

  const handleClickDelete = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
      e.stopPropagation();
      setImages(images === undefined ? undefined : images.filter((i) => i.id !== id));
    },
    [images, setImages]
  );

  return (
    <>
      <Box sx={{ display: "grid", gridTemplateColumns: isSM ? "1fr" : "repeat(3, 1fr)", gap: 1, mb: 1 }}>
        <ReadOnlyColorBox color={colors?.hex} />
        <ReadOnlyColorBox color={colors?.rgb} />
        <ReadOnlyColorBox color={colors?.hsl} />
      </Box>
      <Box sx={{ display: "grid", gap: 1, gridTemplateColumns: isSM ? "1fr" : "1fr 256px" }}>
        <Box
          {...bond}
          sx={{
            alignItems: "center",
            bgcolor: "rgb(240, 240, 240)",
            display: "flex",
            justifyContent: "center",
            overflow: "auto",
            minHeight: 256,
            maxHeight: 512,
            width: "100%",
          }}
        >
          <Box sx={{ display: "block", opacity: loading ? 0.3 : 1.0 }}>
            {selectedImage === null && <Typography>ここに画像ファイルをドラッグ</Typography>}
            <canvas
              ref={canvasRef}
              style={{ display: selectedImage === null ? "none" : "initial" }}
              onMouseDown={handleMouseDown}
            />
          </Box>
        </Box>
        <Box sx={{ border: "1px solid rgba(0, 0, 0, 0.2)", borderRadius: 1, maxHeight: 512, overflow: "auto" }}>
          {images?.map((img) => (
            <Box key={img.id} sx={{ display: "grid", gridTemplateColumns: "1fr auto" }}>
              <MenuItem
                selected={img.id === selectedImageID}
                onClick={() => handleClickMenuItem(img.id)}
                sx={{
                  overflow: "hidden",
                }}
              >
                {dayjs.unix(img.created).format("YYYY/MM/DD HH:mm:ss")}
              </MenuItem>

              <Button size="small" color="error" onClick={(e) => handleClickDelete(e, img.id)}>
                削除
              </Button>
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
});

export default ColorPicker;
