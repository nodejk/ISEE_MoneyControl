import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  useColorScheme,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";

export default function HelpScreen() {
  const colorScheme = useColorScheme();
  const textColor = colorScheme === "dark" ? "white" : "black";
  const keyboardVerticalOffset = 20;

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
          }}
        >
          <Text
            style={{
              fontSize: 40,
              fontWeight: "bold",
              color: textColor,
            }}
          >
            Help
          </Text>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "center",
    paddingLeft: 20,
    paddingRight: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },

  editIcon: {
    // position: "absolute",
    // right: 0,
    // bottom: 0,

    alignItems: "flex-start",
    // alignSelf: "flex-start",
  },
});
