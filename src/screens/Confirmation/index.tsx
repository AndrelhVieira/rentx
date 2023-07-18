import React from "react";
import { StatusBar, useWindowDimensions } from "react-native";

import LogoSVG from "../../assets/logo_background_gray.svg";
import DoneSVG from "../../assets/done.svg";

import { Container, Content, Title, Message, Footer } from "./styles";
import { ConfirmButton } from "../../components/ConfirmButton";
import { useNavigation, useRoute } from "@react-navigation/native";

interface Params {
  title: string;
  message: string;
  buttonText: string;
  nextScreenRoute: string;
}

export function Confirmation() {
  const navigation: any = useNavigation();
  const route = useRoute();
  const { title, message, nextScreenRoute, buttonText } =
    route.params as Params;

  const { width } = useWindowDimensions();

  function handleConfirm() {
    navigation.navigate(nextScreenRoute);
  }

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <LogoSVG width={width} />

      <Content>
        <DoneSVG width={80} height={80} />
        <Title>{title}</Title>
        <Message>{message}</Message>
        <Footer>
          <ConfirmButton title={buttonText} onPress={handleConfirm} />
        </Footer>
      </Content>
    </Container>
  );
}
