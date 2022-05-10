import React from "react";
import SwitchSelector from "react-native-switch-selector";

import { ScrollView, StyleSheet, TextInput, StatusBar } from "react-native";

import { Text, View } from "../../components/Themed";
import { RootTabScreenProps } from "../../types";
import useColorScheme from "../../hooks/useColorScheme";
import { InputField } from "./InputField";

const options = [
  { label: "-", value: "1" },
  { label: "+", value: "2" },
];
export function TransactionModal(props: RootTabScreenProps<any>) {
  const colorScheme = useColorScheme();
  const borderWidth = 1;
  const borderRadius = 9;

  const cardBackground = colorScheme === "dark" ? "rgb(24, 24, 24)" : "white";
  const cardBorderColor =
    colorScheme === "dark" ? "rgb(40, 40, 40)" : "rgb(220, 220, 220)";

  return (
    <View style={{ ...styles.container }}>
      <ScrollView>
        <InputField
          name={"Account"}
          backgroundColor={cardBackground}
          borderColor={cardBorderColor}
          borderTopWidth={borderWidth}
          borderHorizontalWidth={borderWidth}
          borderTopRadius={borderRadius}
          borderBottomRadius={borderRadius}
          borderBottomWidth={borderWidth}
        >
          <TextInput
            style={styles.inputField}
            placeholder={"Required"}
            value={""}
            keyboardType={"number-pad"}
            keyboardAppearance={colorScheme}
          />
        </InputField>

        <InputField
          name={"Description"}
          backgroundColor={cardBackground}
          borderColor={cardBorderColor}
          borderTopWidth={borderWidth}
          borderHorizontalWidth={borderWidth}
          borderTopRadius={borderRadius}
          marginTop={30}
        >
          <TextInput
            style={styles.inputField}
            placeholder={"Optional"}
            value={""}
            keyboardType={"default"}
            keyboardAppearance={colorScheme}
          />
        </InputField>
        <InputField
          name={"Category"}
          backgroundColor={cardBackground}
          borderColor={cardBorderColor}
          borderTopWidth={borderWidth}
          borderHorizontalWidth={borderWidth}
          borderBottomRadius={borderRadius}
          borderBottomWidth={borderWidth}
        >
          <TextInput
            style={styles.inputField}
            placeholder={"Optional"}
            value={""}
            keyboardType={"default"}
            keyboardAppearance={colorScheme}
          />
        </InputField>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: StatusBar.currentHeight! + 100,
    alignContent: "center",
  },
  scrollView: {},

  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  inputField: {
    fontSize: 15,
  },
});
