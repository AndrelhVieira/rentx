import React, { useState } from "react";
import {
  StatusBar,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";

import { Container, Header, SubTitle, Title, Form, Footer } from "./styles";

import { Button } from "../../components/Button";
import { useTheme } from "styled-components";
import { Input } from "../../components/Input";
import { PasswordInput } from "../../components/PasswordInput";

import * as Yup from "yup";

import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../hooks/auth";

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation: any = useNavigation();
  const { signIn } = useAuth();

  const theme = useTheme();

  async function handleSignIn() {
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .required("O Email é obrigatório")
          .email("Digite um email válido"),
        password: Yup.string().required("A Senha é obrigatória"),
      });

      await schema.validate({ email, password });

      signIn({ email, password });
    } catch (error) {
      console.log(error);

      if (error instanceof Yup.ValidationError) {
        Alert.alert("Opa", error.message);
        return;
      }
      Alert.alert(
        "Erro na autenticação",
        "Ocorreu um erro ao fazer login, verifiqueas credenciais"
      );
    }
  }

  function handleNewAccount() {
    navigation.navigate("SignUpFirstStep");
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <StatusBar
            translucent
            barStyle="dark-content"
            backgroundColor="tranparent"
          />
          <Header>
            <Title>Estamos{"\n"}quase lá.</Title>
            <SubTitle>
              Faça seu login para começar{"\n"}uma experiência incrível.
            </SubTitle>
          </Header>

          <Form>
            <Input
              iconName="mail"
              placeholder="E-mail"
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={setEmail}
              value={email}
            />
            <PasswordInput
              iconName="lock"
              placeholder="Senha"
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={setPassword}
              value={password}
            />
          </Form>

          <Footer>
            <Button
              title="Login"
              onPress={handleSignIn}
              enabled={true}
              loading={false}
            />
            <Button
              title="Criar conta gratuita"
              color={theme.colors.background_secondary}
              onPress={handleNewAccount}
              enabled={true}
              loading={false}
              light
            />
          </Footer>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
