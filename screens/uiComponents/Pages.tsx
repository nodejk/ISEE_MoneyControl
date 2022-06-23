import React from "react";
import { View, Text } from "react-native";
import { Feather as Icon, FontAwesome } from "@expo/vector-icons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export const Page = ({ backgroundColor, iconName, title, children }) => {
  return (
    <View style={{ backgroundColor, flex: 1 }}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor,
        }}
      >
        <MaterialCommunityIcons
          name={iconName}
          size={162}
          color={"white"}
        ></MaterialCommunityIcons>
        <View style={{ marginTop: 16 }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: "white",
              justifyContent: "center",
            }}
          >
            {title}
          </Text>
        </View>
      </View>
      {children}
    </View>
  );
};
