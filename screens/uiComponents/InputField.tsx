import React from "react";
import { Platform, StyleSheet, TextInput, useColorScheme } from "react-native";
import { Text, View } from "../../components/Themed";
import { InputFieldProps } from "../../interface";

export function InputField(props: InputFieldProps) {
  const colorScheme = useColorScheme();
  const textColor = colorScheme === "dark" ? "white" : "black";
  return (
    <View
      style={{
        borderTopWidth:
          props.borderTopWidth === undefined ? 0 : props.borderTopWidth,
        borderBottomWidth:
          props.borderBottomWidth === undefined ? 0 : props.borderBottomWidth,
        borderRightWidth:
          props.borderHorizontalWidth === undefined
            ? 0
            : props.borderHorizontalWidth,
        borderLeftWidth:
          props.borderHorizontalWidth === undefined
            ? 0
            : props.borderHorizontalWidth,

        borderColor:
          props.borderColor === undefined ? "black" : props.borderColor,
        marginTop: props.marginTop === undefined ? 0 : props.marginTop,
        marginBottom: props.marginBottom === undefined ? 0 : props.marginBottom,
        borderTopLeftRadius:
          props.borderTopRadius === undefined ? 0 : props.borderTopRadius,
        borderTopRightRadius:
          props.borderTopRadius === undefined ? 0 : props.borderTopRadius,
        borderBottomLeftRadius:
          props.borderBottomRadius === undefined ? 0 : props.borderBottomRadius,
        borderBottomRightRadius:
          props.borderBottomRadius === undefined ? 0 : props.borderBottomRadius,

        ...styles.container,
      }}
    >
      <Text
        style={{
          paddingRight: props.paddingRight,
          color: textColor,
          ...styles.name,
        }}
      >
        {props.name}
      </Text>
      {props.children === undefined ? (
        <TextInput
          style={styles.inputField}
          placeholder={props.placeholder}
          value={""}
          keyboardType={"default"}
          keyboardAppearance={colorScheme}
          textAlign="right"
        />
      ) : (
        props.children
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  name: {
    fontSize: 16,
    padding: 5,
    flex: 1,
  },

  container: {
    justifyContent: "space-between",
    flexDirection: "row",
    padding: 10,
  },
  inputField: {
    flex: 1,
    fontSize: 15,
  },
});
