import React from "react";
import { Pressable } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { HeaderButtonProps } from "../../interface";

export function HeaderButton(props: HeaderButtonProps) {
  //   console.log("button pressed");
  //   console.log(props.onPress);
  return (
    <Pressable onPress={props.onPress}>
      <MaterialCommunityIcons
        name={props.name}
        size={props.size}
        style={{
          marginTop: props.marginTop,
          marginBottom: props.marginBottom,
          marginLeft: props.marginLeft,
          marginRight: props.marginRight,
        }}
        color={props.color}
      />
    </Pressable>
  );
}
