// import React from "react";
import { useEffect } from "react";
import {
  Canvas,
  useImage,
  Image,
  rotate,
  Group,
} from "@shopify/react-native-skia";
import { useWindowDimensions } from "react-native";
import {
  useSharedValue,
  withTiming,
  Easing,
  withSequence,
  withRepeat,
  useFrameCallback,
  useDerivedValue,
  interpolate,
  Extrapolation,
} from "react-native-reanimated";
import {
  GestureHandlerRootView,
  GestureDetector,
  Gesture,
} from "react-native-gesture-handler";

const GRAVITY = 1000;
const JUMP_FORCE = -500;
// const birdRotation = useDerivedValue(() => {
//   return birdYVelocity.value;
// });
const App = () => {
  const { width, height } = useWindowDimensions();
  const bg = useImage(require("./assets/sprites/background-day.png"));
  const bird = useImage(require("./assets/sprites/yellowbird-upflap.png"));
  const pipeBottom = useImage(require("./assets/sprites/pipe-green.png"));
  const topPipe = useImage(require("./assets/sprites/pipe-green - top.png"));
  const base = useImage(require("./assets/sprites/base.png"));
  const x = useSharedValue(width);
  const birdY = useSharedValue(height / 3);
  const birdYVelocity = useSharedValue(0);

  useFrameCallback(({ timeSincePreviousFrame: dt }) => {
    // console.log(birdY.value + birdYVelocity * dt);
    if (!dt) {
      return;
    }
    birdY.value = birdY.value + (birdYVelocity.value * dt) / 1000;
    birdYVelocity.value = birdYVelocity.value + (GRAVITY * dt) / 1000;
    // console.log("velocity:", birdYVelocity.value);
  });

  useEffect(() => {
    x.value = withRepeat(
      withSequence(
        withTiming(-150, {
          duration: 3000,
          easing: Easing.linear,
        }),
        withTiming(width, { duration: 0 })
      ),
      -1
    );

    // birdY.value = withTiming(height, { duration: 1000 });
  }, []);

  const gesture = Gesture.Tap().onStart(() => {
    birdYVelocity.value = -500;
    console.log("tap started");
  });

  const pipeOffset = 0;

  const birdTransform = useDerivedValue(() => {
    return [
      {
        rotate: interpolate(
          birdYVelocity.value,
          [-50, 50],
          [-0.5, 0.5],
          Extrapolation.CLAMP
        ),
      },
    ];
  });
  const birdOrigin = useDerivedValue(() => {
    return { x: width / 4 + 32, y: birdY.value + 24 };
  });
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GestureDetector gesture={gesture}>
        <Canvas style={{ width, height }}>
          {/* BG */}
          <Image image={bg} fit={"cover"} width={width} height={height} />
          {/* Base  */}
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
            x={x}
            width={103}
            height={640}
          />
          <Image
            image={pipeBottom}
            y={height - 320 + pipeOffset}
            x={x}
            width={103}
            height={640}
          />
          {/* Bird */}

          <Group transform={birdTransform} origin={birdOrigin}>
            <Image
              image={bird}
              y={birdY}
              x={width / 4}
              width={64}
              height={48}
            />
          </Group>
        </Canvas>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};
export default App;
