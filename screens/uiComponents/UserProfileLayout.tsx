import { ScrollView, StyleSheet } from "react-native";
import useColorScheme from "../../hooks/useColorScheme";
import { Text, View } from "../../components/Themed";
import { Avatar, Caption, Title } from "react-native-paper";
import React, { useContext } from "react";
import { RootTabScreenProps } from "../../types";
import { UserProfileNavigationCard } from "./UserProfileNavigationCard";
import { FontAwesome } from "@expo/vector-icons";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import Colors from "../../constants/Colors";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { v4 as uuid } from "uuid";
import { UserContext } from "../../store/UserContextProvider";

export default function UserProfileLayout(navigation: RootTabScreenProps<any>) {
  const colorScheme = useColorScheme();
  const buttonColor =
    colorScheme === "dark" ? "rgb(80, 80, 80)" : "rgb(200, 200, 200)";
  const iconSize = 21;
  const fontSize = 17;
  const userContext = useContext(UserContext);
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
            {userContext.firstName} {userContext.lastName}
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

        <UserProfileNavigationCard
          currency={"EURO"}
          {...{
            key: "Edit Profile",
            cardName: "Edit Profile",
            nameOfIcon: "arrow-right",
            colorOfIcon: "red",
            topGap: 10,
            topBorder: 1,
            bottomBorder: 0,
            fontSize: fontSize,
            children: [
              <MaterialCommunityIcons
                name={"circle-edit-outline"}
                color={Colors["light"].tint}
                size={iconSize}
                key={uuid()}
              />,
              <FontAwesome
                name="chevron-right"
                size={16}
                color={buttonColor}
                key={uuid()}
              />,
            ],

            navigation: navigation,
            navigationScreen: "EditProfile",
          }}
        />
        <UserProfileNavigationCard
          currency={"EURO"}
          {...{
            cardName: "Sync Account",
            key: "Sync",
            topBorder: 1,
            bottomBorder: 1,
            fontSize: fontSize,
            children: [
              <MaterialCommunityIcons
                name={"cloud-sync"}
                color={Colors["light"].tint}
                size={iconSize}
                key={uuid()}
              />,
              <FontAwesome
                name="chevron-right"
                size={16}
                color={buttonColor}
                key={uuid()}
              />,
            ],
            navigation: navigation,
            navigationScreen: "SyncAccount",
          }}
        />
        <UserProfileNavigationCard
          currency={"EURO"}
          {...{
            cardName: "Scheduled",
            key: "Scheduled Transactions",
            topGap: 30,
            topBorder: 1,
            bottomBorder: 1,
            fontSize: fontSize,
            children: [
              <MaterialCommunityIcons
                name={"calendar-multiselect"}
                color={Colors["light"].tint}
                size={iconSize}
                key={uuid()}
              />,
              <FontAwesome
                name="chevron-right"
                size={16}
                color={buttonColor}
                key={uuid()}
              />,
            ],
            navigation: navigation,
            navigationScreen: "ScheduleTransactions",
          }}
        />
        <UserProfileNavigationCard
          currency={"EURO"}
          {...{
            key: "Settings",
            cardName: "Settings",
            topGap: 30,
            topBorder: 1,
            fontSize: fontSize,
            children: [
              <MaterialCommunityIcons
                name={"cog-outline"}
                color={Colors["light"].tint}
                size={iconSize}
                key={uuid()}
              />,
              <FontAwesome
                name="chevron-right"
                size={16}
                color={buttonColor}
                key={uuid()}
              />,
            ],
            navigation: navigation,
            navigationScreen: "Settings",
          }}
        />
        <UserProfileNavigationCard
          currency={"EURO"}
          {...{
            cardName: "Help",
            key: "Help",
            topBorder: 1,
            bottomBorder: 1,
            fontSize: fontSize,
            children: [
              <MaterialCommunityIcons
                name={"help-circle-outline"}
                color={Colors["light"].tint}
                size={iconSize}
                key={uuid()}
              />,
              <FontAwesome
                name="chevron-right"
                size={16}
                color={buttonColor}
                key={uuid()}
              />,
            ],
            navigation: navigation,
            navigationScreen: "Help",
          }}
        />

        <UserProfileNavigationCard
          currency={"EURO"}
          {...{
            cardName: "Support",
            key: "SupportPage",
            topBorder: 1,
            bottomBorder: 1,
            topGap: 30,
            fontSize: fontSize,
            children: [
              <MaterialCommunityIcons
                name={"handshake-outline"}
                color={Colors["light"].tint}
                size={iconSize}
                key={uuid()}
              />,
              <FontAwesome
                name="chevron-right"
                size={16}
                color={buttonColor}
                key={uuid()}
              />,
            ],
            navigation: navigation,
            navigationScreen: "SupportPage",
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
