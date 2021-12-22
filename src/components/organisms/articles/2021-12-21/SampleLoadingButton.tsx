import { LoadingButton } from "@mui/lab";
import { useCallback, useState } from "react";

interface Props {}

export const SampleLoadingButton: React.VFC<Props> = () => {
  const [loading, setLoading] = useState(false);

  const handleClick = useCallback(() => {
    window.setTimeout(() => setLoading(false), 1000);
    setLoading(true);
  }, []);

  return (
    <LoadingButton
      loading={loading}
      variant="contained"
      onClick={handleClick}
      sx={{
        textTransform: "none",
      }}
    >
      Click Me!
    </LoadingButton>
  );
};

export default SampleLoadingButton;
