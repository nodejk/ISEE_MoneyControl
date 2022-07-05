import { FontAwesome } from "@expo/vector-icons";
import React, { useContext, useState } from "react";
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
import { UserContext } from "../store/UserContextProvider";

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

  const userContext = useContext(UserContext);

  const [firstName, setFirstName] = useState(userContext.firstName);
  const [lastName, setLastName] = useState(userContext.lastName);

  useEffect(() => {
    return () => {
      userContext.firstNameHandler(firstName);
      userContext.lastNameHandler(lastName);
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
          </View>
          <InputField
            name={"First Name"}
            backgroundColor={cardBackground}
            borderColor={cardBorderColor}
            borderTopWidth={borderWidth}
            borderHorizontalWidth={borderWidth}
            borderTopRadius={borderRadius}
            placeholder={"Required"}
          >
            <TextInput
              style={{ color: "white" }}
              placeholder={"Required"}
              value={firstName}
              onChangeText={(txt) => {
                setFirstName(txt);
              }}
              keyboardType={"default"}
              textAlign="right"
            />
          </InputField>
          <InputField
            name={"Last Name"}
            backgroundColor={cardBackground}
            borderColor={cardBorderColor}
            borderTopWidth={borderWidth}
            borderHorizontalWidth={borderWidth}
            borderBottomRadius={borderRadius}
            borderBottomWidth={borderWidth}
            placeholder={"Required"}
          >
            <TextInput
              style={{ color: "white" }}
              placeholder={"Required"}
              value={lastName}
              onChangeText={(txt) => {
                setLastName(txt);
              }}
              keyboardType={"default"}
              textAlign="right"
            />
          </InputField>
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
