import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, useColorScheme, View } from "react-native";
import { Card, Text } from "react-native-paper";
import { profileLayoutCardProps } from "../../interface";
import { FunctionComponent } from "react";
import IconButtonProps from "react-native-paper/lib/typescript/components/MaterialCommunityIcon";

export default function UserProfileCard(props: profileLayoutCardProps) {
  const colorScheme = useColorScheme();

  const textColor = colorScheme === "dark" ? "white" : "black";
  const cardBackground = colorScheme === "dark" ? "rgb(24, 24, 24)" : "white";

  return (
    <React.Fragment>
      <Card
        style={{
          borderTopWidth: props.topBorder,
          borderBottomWidth: props.bottomBorder,
          borderRadius: 0,
          borderColor:
            colorScheme === "dark" ? "rgb(40, 40, 40)" : "rgb(220, 220, 220)",
          backgroundColor: cardBackground,
          marginTop: props.topGap,
          marginBottom: props.bottomGap,
          shadowOpacity: 0,
          alignContent: "space-between",
        }}
        onPress={() => {
          console.log("pressed");
          console.log(props.navigation);
          props.navigation?.navigate("EditProfile");
        }}
      >
        <Card.Content>
          <View
            style={{
              flexDirection: "row",
              flexGrow: 1,
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: textColor,
                fontSize: 17,
              }}
            >
              {props.cardName}
            </Text>
            {props.children}
          </View>
        </Card.Content>
      </Card>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({});
