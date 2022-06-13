import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import {
  StyleSheet,
  useColorScheme,
  Text,
  View,
  ScrollView,
  Platform,
  StatusBar,
  Dimensions,
  TextInput,
  SafeAreaView,
  KeyboardAvoidingView,
  ImageBackground,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useEffect } from "react";
import { UserProfileNavigationCard } from "./UserProfileNavigationCard";
import Colors from "../../constants/Colors";
import { RootTabScreenProps } from "../../types";
import { v4 as uuid } from "uuid";

export function SettingsScreen(navigation: RootTabScreenProps<any>) {
  const colorScheme = useColorScheme();
  const borderWidth = 1;
  const borderRadius = 9;

  const cardBackground = colorScheme === "dark" ? "rgb(24, 24, 24)" : "white";
  const cardBorderColor =
    colorScheme === "dark" ? "rgb(40, 40, 40)" : "rgb(220, 220, 220)";
  const textColor = colorScheme === "dark" ? "white" : "black";
  const iconSize = 21;
  const fontSize = 17;
  const keyboardVerticalOffset = 20;
  const buttonColor =
    colorScheme === "dark" ? "rgb(80, 80, 80)" : "rgb(200, 200, 200)";

  useEffect(() => {
    return () => {
      console.log("here now");
    };
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={keyboardVerticalOffset}
        style={styles.container}
      >
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
              marginBottom: 75,
            }}
          >
            Settings
          </Text>
          <UserProfileNavigationCard
            {...{
              key: uuid(),
              cardName: "Edit Categories",
              topGap: 0,
              topBorder: 1,
              topBorderRadius: 10,
              bottomBorderRadius: 0,
              fontSize: fontSize,
              children: [
                <MaterialCommunityIcons
                  name={"shape"}
                  color={Colors["light"].tint}
                  size={iconSize}
                  key={uuid()}
                />,
              ],
              navigation: navigation,
              navigationScreen: "EditTransactionPropertiesModal",
              routeParams: {
                type: "category",
                validator: (t: string) => {
                  return t.length > 0;
                },
              },
            }}
          />

          <UserProfileNavigationCard
            {...{
              key: uuid(),
              cardName: "Edit Payment Methods",
              topBorder: 1,
              topBorderRadius: 0,
              bottomBorderRadius: 10,
              fontSize: fontSize,
              children: [
                <MaterialCommunityIcons
                  name={"credit-card-edit-outline"}
                  color={Colors["light"].tint}
                  size={iconSize}
                  key={uuid()}
                />,
              ],
              navigation: navigation,
              navigationScreen: "EditTransactionPropertiesModal",
              routeParams: {
                type: "paymentMethod",
                validator: (t: string) => {
                  return t.length > 0;
                },
              },
            }}
          />
          {/* <UserProfileNavigationCard
            {...{
              key: uuid(),
              cardName: "Edit Currencies",
              topGap: 0,
              topBorder: 1,
              topBorderRadius: 0,
              bottomBorderRadius: 10,
              fontSize: fontSize,
              children: [
                <MaterialCommunityIcons
                  name={"currency-eur"}
                  color={Colors["light"].tint}
                  size={iconSize}
                  key={uuid()}
                />,
              ],
              navigation: navigation,
              navigationScreen: "EditTransactionPropertiesModal",
              routeParams: {
                type: "currency",
                validator: (t: {
                  currencyName: string;
                  currencyConversionToEuro: number;
                }) => {
                  return (
                    t.currencyName.length > 0 && t.currencyConversionToEuro > 0
                  );
                },
              },
            }}
          /> */}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
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
  profilePicture: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 35,
    marginBottom: 20,
    paddingBottom: 40,
  },

  editIcon: {
    // position: "absolute",
    // right: 0,
    // bottom: 0,

    alignItems: "flex-start",
    // alignSelf: "flex-start",
  },
});
