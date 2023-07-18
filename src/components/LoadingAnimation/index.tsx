import React from "react";

import LottieView from "lottie-react-native";

import LoadAnimated from "../../assets/load_animated.json";

import { Container } from "./styles";

export function LoadingAnimation() {
  return (
    <Container>
      <LottieView
        source={LoadAnimated}
        autoPlay
        style={{ height: 200 }}
        resizeMode="contain"
        loop
      ></LottieView>
    </Container>
  );
}
