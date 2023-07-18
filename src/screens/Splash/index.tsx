import React, { useEffect } from "react";
import { StatusBar } from "react-native";

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  Extrapolate,
  runOnJS,
} from "react-native-reanimated";

import { Container } from "./styles";

import BrandSVG from "../../assets/brand.svg";
import LogoSVG from "../../assets/logo.svg";
import { useNavigation } from "@react-navigation/native";

export function Splash() {
  const navigation: any = useNavigation();

  const splashAnimation = useSharedValue(0);

  const brandStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(splashAnimation.value, [0, 50], [1, 0]),
      transform: [
        {
          translateX: interpolate(
            splashAnimation.value,
            [0, 50],
            [0, -50],
            Extrapolate.CLAMP
          ),
        },
      ],
    };
  });

  const logoStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(splashAnimation.value, [0, 50], [0, 1]),
      transform: [
        {
          translateX: interpolate(
            splashAnimation.value,
            [0, 50],
            [-50, 0],
            Extrapolate.CLAMP
          ),
        },
      ],
    };
  });

  function startApp() {
    navigation.navigate("SignIn");
  }

  useEffect(() => {
    splashAnimation.value = withTiming(50, { duration: 1000 }, () => {
      "worklet";
      runOnJS(startApp)();
    });
  });

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <Animated.View style={[brandStyle, { position: "absolute" }]}>
        <BrandSVG width={80} height={50} />
      </Animated.View>

      <Animated.View style={[logoStyle, { position: "absolute" }]}>
        <LogoSVG width={180} height={20} />
      </Animated.View>
    </Container>
  );
}
