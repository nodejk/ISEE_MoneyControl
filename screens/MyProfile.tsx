import { StyleSheet, SafeAreaView } from "react-native";
import UserProfileLayout from "./uiComponents/UserProfileLayout";
import { View } from "../components/Themed";
import React from "react";
import { RootTabScreenProps, RootStackScreenProps } from "../types";

export function MyProfile({ navigation }: RootTabScreenProps<any>) {
  return (
    <View style={styles.container}>
      <View style={styles.profileSection}></View>
      <UserProfileLayout key={"usernav"} navigation={navigation} route={null} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  profileSection: {
    paddingBottom: 10,
  },
  settingsSection: {},
  userInformationFont: {},
});
