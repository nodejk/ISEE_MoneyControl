import React from "react";
import { View, useWindowDimensions } from "react-native";

import { RoundedButton } from "./RoundedStartingButton";

export const Footer = ({
  rightButtonLabel,
  rightButtonPress,
  leftButtonPress,
  leftButtonLabel,
}) => {
  const windowWidth = useWindowDimensions().width;
  const HEIGHT = windowWidth * 0.25;
  const FOOTER_PADDING = windowWidth * 0.1;
  console.log(leftButtonPress);

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        height: HEIGHT,
        backgroundColor: "rgba(50, 50, 50, 0.95)",
        opacity: 0.6,
        alignItems: "center",
        paddingHorizontal: FOOTER_PADDING,
      }}
    >
      {leftButtonPress !== undefined ? (
        <RoundedButton label={leftButtonLabel} onPress={leftButtonPress} />
      ) : (
        <View></View>
      )}
      <RoundedButton label={rightButtonLabel} onPress={rightButtonPress} />
    </View>
  );
};
