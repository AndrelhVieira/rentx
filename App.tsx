import React, { useCallback, useEffect, useState } from "react";
import { View } from "react-native";

import { Inter_400Regular, Inter_500Medium } from "@expo-google-fonts/inter";

import {
  Archivo_400Regular,
  Archivo_500Medium,
  Archivo_600SemiBold,
} from "@expo-google-fonts/archivo";

import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";

import { ThemeProvider } from "styled-components";
import theme from "./src/styles/theme";

import { AppProvider } from "./src/hooks";

import { Routes } from "./src/routes";

import { LogBox } from "react-native";

LogBox.ignoreLogs([
  "ViewPropTypes will be removed from React Native. Migrate to ViewPropTypes exported from 'deprecated-react-native-prop-types'.",
]);

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await Font.loadAsync({
          Archivo_400Regular,
          Archivo_500Medium,
          Archivo_600SemiBold,
          Inter_400Regular,
          Inter_500Medium,
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <View onLayout={onLayoutRootView} style={{ flex: 1 }}>
        <AppProvider>
          <Routes />
        </AppProvider>
      </View>
    </ThemeProvider>
  );
}
