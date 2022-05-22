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

import { Card } from "react-native-paper";
import { EditProfileLayoutCard } from "./uiComponents/EditProfileLayoutCard";
import { InputField } from "./uiComponents/InputField";
import { Avatar, Caption, Title } from "react-native-paper";
import { useEffect } from "react";
export default function EditProfileScreen() {
  const colorScheme = useColorScheme();
  const borderWidth = 1;
  const borderRadius = 9;

  const cardBackground = colorScheme === "dark" ? "rgb(24, 24, 24)" : "white";
  const cardBorderColor =
    colorScheme === "dark" ? "rgb(40, 40, 40)" : "rgb(220, 220, 220)";

  const keyboardVerticalOffset = 20;

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
              color: "black",
              fontSize: 40,
              fontWeight: "bold",
            }}
          >
            Edit Profile
          </Text>
          <View style={styles.profilePicture}>
            <Avatar.Image
              source={{
                uri: "https://api.adorable.io/avatars/80/abott@adorable.png",
              }}
              size={150}
            />
            <MaterialCommunityIcons
              style={styles.editIcon}
              size={25}
              name={"pencil-outline"}
            ></MaterialCommunityIcons>

            {/* <Avatar.Image
              source={{
                uri: ,
              }}
              size={150}
            />
            <MaterialCommunityIcons
              style={styles.editIcon}
              name={"pencil-outline"}
            ></MaterialCommunityIcons> */}
          </View>
          <InputField
            name={"First Name"}
            backgroundColor={cardBackground}
            borderColor={cardBorderColor}
            borderTopWidth={borderWidth}
            borderHorizontalWidth={borderWidth}
            borderTopRadius={borderRadius}
            placeholder={"Required"}
          ></InputField>
          <InputField
            name={"Last Name"}
            backgroundColor={cardBackground}
            borderColor={cardBorderColor}
            borderTopWidth={borderWidth}
            borderHorizontalWidth={borderWidth}
            placeholder={"Required"}
          ></InputField>
          <InputField
            name={"Email"}
            backgroundColor={cardBackground}
            borderColor={cardBorderColor}
            borderTopWidth={borderWidth}
            borderHorizontalWidth={borderWidth}
            borderBottomRadius={borderRadius}
            borderBottomWidth={borderWidth}
            placeholder={"Required"}
          ></InputField>
        </ScrollView>
        {/* </View> */}
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
