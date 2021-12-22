import { Dialog, DialogContent } from "@mui/material";
import { memo, useState } from "react";

type Props = Omit<JSX.IntrinsicElements["img"], "onClick">;

export const Image: React.VFC<Props> = ({ width, ...props }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
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
        onClick={() => setOpen(true)}
      />
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        transitionDuration={0}
        maxWidth="xl"
      >
        <DialogContent>
          <img
            alt=""
            {...props}
            style={{
              verticalAlign: "middle",
            }}
            onClick={() => setOpen(true)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default memo(Image);
