import RectRotateBox from "./organisms/rect-rotate-box";

interface Props {}

export const App: React.VFC<Props> = () => {
  return (
    <>
      <RectRotateBox
        width={256}
        height={64}
        count={32}
        lineWidth={2}
        radius={16}
      />
    </>
  );
};

export default App;
