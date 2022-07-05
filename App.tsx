import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaViewBase, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { TransactionContextProvider } from "./store/TransactionContextProvider";
import { UserContextProvider } from "./store/UserContextProvider";
import { Onboarding } from "./screens/uiComponents/StartingScreens";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const backgroundColor = colorScheme === "dark" ? "black" : "white";

  const [startingScreen, setStartingScreen] = React.useState(true);

  function startingScreenHandler() {
    console.log("here------");
    setStartingScreen(!startingScreen);
  }

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <UserContextProvider>
          <TransactionContextProvider>
            {!startingScreen && <Navigation colorScheme={colorScheme} />}
            {!startingScreen && <StatusBar />}
            {startingScreen && (
              <Onboarding startingScreenHandler={startingScreenHandler} />
            )}
          </TransactionContextProvider>
        </UserContextProvider>
      </SafeAreaProvider>
    );
  }
}
