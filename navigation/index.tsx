/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName, Pressable } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { HeaderButton } from "../screens/uiComponents/HeaderButtons";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import HelpScreen from "../screens/HelpScreen";
import { TransactionModal } from "../screens/uiComponents/TransactionModal";
import NotFoundScreen from "../screens/NotFoundScreen";
import TabOneScreen from "../screens/TabOneScreen";
import TabTwoScreen from "../screens/TabTwoScreen";
import { MyProfile } from "../screens/MyProfile";
import EditProfileScreen from "../screens/EditProfileScreen";
import { ScheduleTransactionsScreen } from "../screens/ScheduleTransactionScreen";
import { SettingsScreen } from "../screens/uiComponents/SettingsScreen";
import { FilterModal } from "../screens/uiComponents/FilterModal";
import { StyleSheet } from "react-native";
import { EditTransactionPropertiesModal } from "../screens/uiComponents/EditTransactionPropertiesModal";
import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import { SyncAccount } from "../screens/uiComponents/SyncAccount";
export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();
const iconSize = 35;

function RootNavigator() {
  const margins = { marginTop: 18, marginRight: 10, marginLeft: 10 };
  const colorScheme = useColorScheme();
  const headerColor = colorScheme === "dark" ? "black" : "white";
  const backgroundColor = colorScheme === "dark" ? "black" : "white";

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
      <Stack.Group
        screenOptions={{
          presentation: "modal",
          contentStyle: { backgroundColor: backgroundColor },
          headerShown: false,
          headerStyle: { backgroundColor: backgroundColor },
        }}
      >
        <Stack.Screen
          name="FilterModalTabOne"
          component={FilterModal}
          options={({ navigation }: any) => ({
            title: "",
          })}
        />
        <Stack.Screen
          name="FilterModalTabTwo"
          component={FilterModal}
          options={({ navigation }: any) => ({
            title: "",
          })}
        />
        <Stack.Screen
          name="EditTransaction"
          component={TransactionModal}
          options={({ navigation }: any) => ({
            title: "",
            headerShadowVisible: false,
            headerStyle: { backgroundColor: headerColor },
            // headerRight: () => (
            //   <HeaderButton
            //     name={"check"}
            //     size={iconSize}
            //     {...margins}
            //     color={"red"}
            //   ></HeaderButton>
            // ),
            // headerLeft: () => (
            //   <HeaderButton
            //     name={"close"}
            //     size={iconSize}
            //     {...margins}
            //     onPress={() => navigation.goBack()}
            //     color={"red"}
            //   ></HeaderButton>
            // ),
          })}
        />
        <Stack.Screen
          name="AddTransaction"
          component={TransactionModal}
          options={({ navigation }: any) => ({
            title: "",
            headerShadowVisible: false,
            headerStyle: { backgroundColor: headerColor },
          })}
        />
        <Stack.Screen
          name="EditTransactionPropertiesModal"
          component={EditTransactionPropertiesModal}
          options={({ navigation }: any) => ({
            title: "",
            headerShadowVisible: false,
            headerStyle: { backgroundColor: headerColor },
          })}
        />
      </Stack.Group>

      <Stack.Group
        screenOptions={{
          presentation: "card",
          contentStyle: { backgroundColor: backgroundColor },
        }}
      >
        <Stack.Screen
          name="Help"
          component={HelpScreen}
          options={{
            title: "",
            headerShadowVisible: false,
            headerStyle: { backgroundColor: headerColor },
          }}
        />
        <Stack.Screen
          name="SyncAccount"
          component={SyncAccount}
          options={{
            title: "",
            headerShadowVisible: false,
            headerStyle: { backgroundColor: headerColor },
          }}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfileScreen}
          options={{
            title: "",
            headerShadowVisible: false,
            headerStyle: { backgroundColor: headerColor },
          }}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            title: "",
            headerShadowVisible: false,
            headerStyle: { backgroundColor: headerColor },
          }}
        />
        <Stack.Screen
          name="ScheduleTransactions"
          component={ScheduleTransactionsScreen}
          options={({ navigation }: any) => ({
            title: "",
            headerShadowVisible: false,
            headerStyle: { backgroundColor: headerColor },
            headerRight: () => (
              <Pressable
                onPress={() =>
                  navigation.navigate({
                    name: "AddTransaction",
                    params: {
                      transactionType: "addTransaction",
                      scheduleTransaction: true,
                    },
                  })
                }
              >
                <MaterialCommunityIcons
                  name="plus"
                  size={iconSize}
                  style={styles.modalHeaderButton}
                  color={Colors["light"].tint}
                />
              </Pressable>
            ),
          })}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();
  const headerColor = colorScheme === "dark" ? "black" : "white";

  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        tabBarStyle: { height: 90 },
      }}
    >
      <BottomTab.Screen
        name="TabOne"
        component={TabOneScreen}
        options={({ navigation }) => ({
          title: "",
          headerShadowVisible: false,
          headerStyle: { backgroundColor: headerColor },
          tabBarIcon: ({ color }) => (
            <TabBarIconMUI name="currency-eur" color={color} />
          ),
          headerLeft: () => (
            <Pressable
              onPress={() =>
                navigation.navigate({
                  name: "FilterModalTabOne",
                  params: { navigateTo: "TabOne" },
                })
              }
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <MaterialCommunityIcons
                name="filter-variant"
                size={iconSize - 1}
                style={{ marginLeft: 18 }}
                color={Colors["light"].tint}
              />
            </Pressable>
          ),

          headerRight: () => (
            <Pressable
              onPress={() => {
                navigation.navigate({
                  name: "AddTransaction",
                  params: { transactionType: "addTransaction" },
                });
              }}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <MaterialCommunityIcons
                name="plus"
                size={iconSize}
                style={{ marginRight: 18 }}
                color={Colors["light"].tint}
              />
            </Pressable>
          ),
        })}
      />

      <BottomTab.Screen
        name="TabTwo"
        component={TabTwoScreen}
        options={({ navigation }) => ({
          title: "",
          headerShadowVisible: false,
          headerStyle: { backgroundColor: headerColor },
          tabBarIcon: ({ color }) => (
            <TabBarIconMUI name="finance" color={color} />
          ),
          headerLeft: () => (
            <Pressable
              onPress={() =>
                navigation.navigate({
                  name: "FilterModalTabTwo",
                  params: { navigateTo: "TabTwo" },
                })
              }
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <MaterialCommunityIcons
                name="filter-variant"
                size={iconSize - 1}
                style={{ marginLeft: 18 }}
                color={Colors["light"].tint}
              />
            </Pressable>
          ),
        })}
      />

      <BottomTab.Screen
        name="TabThree"
        component={MyProfile}
        options={{
          title: "",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <TabBarIconMUI name="account" color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={35} style={{ marginBottom: -3 }} {...props} />;
}

function TabBarIconMUI(props: { name: string; color: string }) {
  return (
    <MaterialCommunityIcons size={35} style={{ marginBottom: -3 }} {...props} />
  );
}

const styles = StyleSheet.create({
  modalHeaderButton: {
    marginRight: 10,
    marginTop: 10,
  },
});
