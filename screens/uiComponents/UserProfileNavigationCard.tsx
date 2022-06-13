import React from "react";
import { StyleSheet, useColorScheme, View } from "react-native";
import { Card, Text } from "react-native-paper";
import { ProfileNaivgationProps } from "../../interface";

export function UserProfileNavigationCard(props: ProfileNaivgationProps) {
  const colorScheme = useColorScheme();

  const textColor = colorScheme === "dark" ? "white" : "black";
  const cardBackground = colorScheme === "dark" ? "rgb(24, 24, 24)" : "white";
  const cardBorderColor =
    colorScheme === "dark" ? "rgb(40, 40, 40)" : "rgb(220, 220, 220)";

  console.log(props);
  return (
    <React.Fragment>
      <Card
        style={{
          borderTopWidth: props.topBorder,
          borderBottomWidth: props.bottomBorder,
          borderTopLeftRadius: props.topBorderRadius,
          borderTopRightRadius: props.topBorderRadius,
          borderBottomLeftRadius: props.bottomBorderRadius,
          borderBottomRightRadius: props.bottomBorderRadius,
          borderColor: cardBorderColor,
          backgroundColor: cardBackground,
          marginTop: props.topGap,
          marginBottom: props.bottomGap,
          shadowOpacity: 0,
          alignContent: "space-between",
        }}
        onPress={() => {
          props.navigation === undefined
            ? ""
            : props.navigation?.navigation.navigate({
                name: props.navigationScreen,
                params: props.routeParams,
              });
        }}
      >
        <Card.Content>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              {props.children === undefined ? null : props.children[0]}
              <Text
                style={{
                  color: textColor,
                  fontSize: props.fontSize,
                  marginLeft: 10,
                }}
              >
                {props.cardName}
              </Text>
            </View>
            {props.children === undefined ? "" : props.children[1]}
          </View>
        </Card.Content>
      </Card>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({});
