import React from "react";
import { View, StyleSheet, useColorScheme, TextInput } from "react-native";

import { ProfileSettingInputFieldProps } from "../../interface";

export function EditProfileLayoutCard(props: ProfileSettingInputFieldProps) {
  const colorScheme = useColorScheme();

  const cardBackground = colorScheme === "dark" ? "rgb(24, 24, 24)" : "white";
  const cardBorderColor =
    colorScheme === "dark" ? "rgb(40, 40, 40)" : "rgb(220, 220, 220)";
  const textColor = colorScheme === "dark" ? "white" : "black";
  return (
    // <TouchableOpacity>
    <View
      style={{
        ...styles.action,
      }}
    >
      <TextInput
        style={{
          backgroundColor: cardBackground,
          color: textColor,
          borderColor: cardBorderColor,
          flex: props.children === undefined ? 1 : 0,
          ...styles.input,
          borderTopRightRadius: props.borderRadiusTop,
          borderTopLeftRadius: props.borderRadiusTop,
          borderBottomLeftRadius: props.borderRadiusBottom,
          borderBottomRightRadius: props.borderRadiusBottom,
          marginTop: props.topGap,
          marginBottom: props.bottomGap,
          borderTopWidth: props.topBorder,
          borderBottomWidth: props.bottomBorder,
        }}
        placeholder={props.placeholder}
        value={props.value}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  action: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    alignItems: "center",
  },
  input: {
    height: 40,
    // borderWidth: 1,
    fontSize: 16,
    padding: 10,
  },
});
