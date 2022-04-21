import { StyleSheet, SafeAreaView } from "react-native";
import useColorScheme from "../hooks/useColorScheme";
import UserProfileCard from "./UserProfileCard";
import { Text, View } from "../components/Themed";
import React from "react";
import { RootTabScreenProps } from "../types";

export default function TabTwoScreen({ navigation }: RootTabScreenProps<any>) {
  return (
    <View style={styles.container}>
      <View style={styles.profileSection}></View>
      <UserProfileCard navigation={navigation} route={"s"} />
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
