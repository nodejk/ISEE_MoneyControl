import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaViewBase, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { TransactionContextProvider } from "./store/TransactionContextProvider";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const backgroundColor = colorScheme === "dark" ? "black" : "white";

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <TransactionContextProvider>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </TransactionContextProvider>
      </SafeAreaProvider>
    );
  }
}
