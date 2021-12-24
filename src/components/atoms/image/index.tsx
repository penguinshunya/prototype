import { Dialog } from "@mui/material";
import { memo, useState } from "react";

type Props = Omit<JSX.IntrinsicElements["img"], "onClick">;

export const Image: React.VFC<Props> = memo(({ width, ...props }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <a href={props.src} target="_blank" rel="noreferrer">
        <img
          alt=""
          width={width}
          {...props}
          style={{
            cursor: "pointer",
            maxWidth: "100%",
            verticalAlign: "middle",
            ...props.style,
          }}
          // onClick={() => setOpen(true)}
        />
      </a>
      <Dialog open={open} onClose={() => setOpen(false)} transitionDuration={0} maxWidth="xl" PaperProps={{
        sx: { borderRadius: 0 },
      }}>
        <img
          alt=""
          {...props}
          style={{
            verticalAlign: "middle",
          }}
          onClick={() => setOpen(true)}
        />
      </Dialog>
    </>
  );
});

export default Image;
