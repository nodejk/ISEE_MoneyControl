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

export function SupportPage(navigation: RootTabScreenProps<any>) {
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
    <View style={{ flex: 1, paddingBottom: 50 }}>
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
            Support
          </Text>

          <Text style={{ ...styles.header, color: textColor }}>
            Need Help with the app?
          </Text>

          <Text
            style={{
              ...styles.subheading,
              color: textColor,
              marginTop: 25,
              marginBottom: 20,
            }}
          >
            Contact-below 😏
          </Text>

          <Text style={{ ...styles.paragraph, color: textColor }}>
            <MaterialCommunityIcons size={19} color={textColor} name="phone" />
            {"   "}
            +49-123-123456 {"\n\n"}
            <MaterialCommunityIcons
              name="email"
              size={19}
              color={Colors["light"].tint}
            />
            {"   "}
            blah-blah@money.io
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

  header: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 20,
  },

  subheading: {
    fontSize: 21,
    fontWeight: "bold",
  },

  paragraph: {
    fontSize: 18,
  },
  editIcon: {
    // position: "absolute",
    // right: 0,
    // bottom: 0,

    alignItems: "flex-start",
    // alignSelf: "flex-start",
  },
});
