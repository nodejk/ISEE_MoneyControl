import { ScrollView, StyleSheet } from "react-native";
import useColorScheme from "../hooks/useColorScheme";
import { Text, View } from "../components/Themed";
import { Avatar, Caption, Title } from "react-native-paper";
import React from "react";
import { RootTabScreenProps } from "../types";
import ProfileLayoutCard from "./uiComponents/ProfileLayoutCard";
import { FontAwesome } from "@expo/vector-icons";
import { NavigationProp, ParamListBase } from "@react-navigation/native";

export default function UserProfileCard({
  navigation,
}: RootTabScreenProps<any>) {
  const colorScheme = useColorScheme();
  const buttonColor =
    colorScheme === "dark" ? "rgb(80, 80, 80)" : "rgb(200, 200, 200)";
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.profilePicture}>
          <Avatar.Image
            source={{
              uri: "https://api.adorable.io/avatars/80/abott@adorable.png",
            }}
            size={150}
          />
        </View>

        <View style={styles.userProfileOverview}>
          <Text
            style={{
              color: colorScheme === "dark" ? "white" : "black",
              ...styles.userProfileNameOverviewText,
            }}
          >
            Krishna Kant Sharma
          </Text>
        </View>
        <View style={styles.userProfileOverview}>
          <Caption
            style={{
              color: colorScheme === "dark" ? "white" : "black",
              marginTop: 5,
              marginBottom: 10,
              ...styles.userProfileEmailOverviewText,
            }}
          >
            {"test123@email.com123"}
          </Caption>
        </View>

        <ProfileLayoutCard
          {...{
            cardName: "Edit Profile",
            nameOfIcon: "arrow-right",
            colorOfIcon: "red",
            topGap: 10,
            topBorder: 1,
            bottomBorder: 1,
            children: (
              <FontAwesome name="chevron-right" size={16} color={buttonColor} />
            ),
            navigation: navigation,
          }}
        />
        <ProfileLayoutCard
          {...{
            cardName: "Sync",
            topGap: 30,
            topBorder: 1,
            bottomBorder: 1,
            children: (
              <FontAwesome name="chevron-right" size={16} color={buttonColor} />
            ),
          }}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },
  userProfileOverview: {
    flexDirection: "row",
    justifyContent: "center",
  },

  userProfileNameOverviewText: {
    fontSize: 30,
  },

  userProfileEmailOverviewText: {
    fontSize: 15,
  },

  title: {
    fontSize: 40,
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
  profilePicture: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 35,
    paddingBottom: 15,
  },
});
