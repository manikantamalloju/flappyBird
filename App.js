// import React from "react";
import { Canvas, useImage, Image } from "@shopify/react-native-skia";
import { useWindowDimensions } from "react-native";

const App = () => {
  const { width, height } = useWindowDimensions();
  const bg = useImage(require("./assets/sprites/background-day.png"));
  const bird = useImage(require("./assets/sprites/yellowbird-upflap.png"));
  const pipeBottom = useImage(require("./assets/sprites/pipe-green.png"));
  const topPipe = useImage(require("./assets/sprites/pipe-green - top.png"));
  const base = useImage(require("./assets/sprites/base.png"));
  const pipeOffset = 0;
  return (
    <Canvas style={{ width, height }}>
      {/* BG */}
      <Image image={bg} fit={"cover"} width={width} height={height} />
      <Image
        image={base}
        width={width}
        height={150}
        y={height - 75}
        x={0}
        fit={"cover"}
      />
      {/* Pipe  */}
      <Image
        image={topPipe}
        y={pipeOffset - 320}
        x={width / 2}
        width={103}
        height={640}
      />

      <Image
        image={pipeBottom}
        y={height - 320 + pipeOffset}
        x={width / 2}
        width={103}
        height={640}
      />

      {/* Bird */}
      <Image image={bird} y={height / 2} x={width / 4} width={64} height={48} />
    </Canvas>
  );
};
export default App;
