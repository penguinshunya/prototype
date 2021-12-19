import RectRotateBox from ".";

interface Props {}

export const RectRotateBoxExample: React.VFC<Props> = () => {
  return (
    <RectRotateBox
      width={256}
      height={64}
      count={32}
      lineWidth={4}
      radius={16}
    />
  );
};

export default RectRotateBoxExample;
