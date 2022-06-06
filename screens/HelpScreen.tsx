import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  useColorScheme,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Colors from "../constants/Colors";
import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";

export default function HelpScreen() {
  const colorScheme = useColorScheme();
  const textColor = colorScheme === "dark" ? "white" : "black";
  const keyboardVerticalOffset = 20;

  const iconSize = 15;

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
            Help
          </Text>

          <Text style={{ ...styles.header, color: textColor }}>
            Getting started with MoneyIO 💰
          </Text>

          <Text
            style={{
              ...styles.subheading,
              color: textColor,
              marginTop: 25,
              marginBottom: 10,
            }}
          >
            Want to add a transaction? 😏
          </Text>

          <Text style={{ ...styles.paragraph, color: textColor }}>
            Go to Tab{" "}
            <MaterialCommunityIcons
              size={19}
              color={textColor}
              name="currency-eur"
            />{" "}
            to view all your transactions. On the top corner, click{" "}
            <MaterialCommunityIcons
              name="plus"
              size={19}
              color={Colors["light"].tint}
            />{" "}
            to add a new transaction. To add click,{" "}
            <MaterialCommunityIcons size={19} color={"green"} name="check" /> or
            to cancel, click{" "}
            <MaterialCommunityIcons size={19} color={"blue"} name="close" /> or
            simply drag the modal down.
          </Text>

          <Text
            style={{
              ...styles.subheading,
              color: textColor,
              marginTop: 25,
              marginBottom: 10,
            }}
          >
            Made a mistake? 😖
          </Text>

          <Text
            style={{
              ...styles.paragraph,
              color: textColor,
              alignItems: "center",
              display: "flex",
            }}
          >
            Aww... don't worry we got you covered! {"\n\n"}
            Go to Tab{" "}
            <MaterialCommunityIcons
              size={19}
              color={textColor}
              name="currency-eur"
            />{" "}
            and click on the transaction you wanna edit. After making the
            changes, click on{" "}
            <MaterialCommunityIcons size={19} color={"green"} name="check" /> to
            confirm the changes. Click on
            <MaterialCommunityIcons size={19} color={"blue"} name="close" /> to
            discard the changes, or simply drag down the modal.{"\n\n"}
            Click on
            <MaterialCommunityIcons
              size={19}
              color={"red"}
              name="trash-can-outline"
            />{" "}
            to delete the transaction.
          </Text>

          <Text
            style={{
              ...styles.subheading,
              color: textColor,
              marginTop: 25,
              marginBottom: 10,
            }}
          >
            Wanna checkout cool graphs 📈?
          </Text>

          <Text style={{ ...styles.paragraph, color: textColor }}>
            Go to Tab{" "}
            <MaterialCommunityIcons
              size={19}
              color={textColor}
              name="finance"
            />{" "}
            and see your last 30 days transactions and a pie (🥧) chart based on
            cateogies.
          </Text>

          <Text
            style={{
              ...styles.subheading,
              color: textColor,
              marginTop: 25,
              marginBottom: 10,
            }}
          >
            Wanna filter 📝?
          </Text>

          <Text style={{ ...styles.paragraph, color: textColor }}>
            Go to any tab and click on{" "}
            <MaterialCommunityIcons
              size={19}
              color={textColor}
              name="filter-variant"
            />{" "}
            set the appropriate filters and confirm by clicking{" "}
            <MaterialCommunityIcons size={19} color={"green"} name="check" />.
            Drag down the modal to cancel the operation. To reset filters, open
            the filter modal and click on 'Reset Filters' and confirm.
          </Text>

          <Text
            style={{
              ...styles.subheading,
              color: textColor,
              marginTop: 25,
              marginBottom: 10,
            }}
          >
            [Bonus] Switch between dark and light modes ✨
          </Text>

          <Text style={{ ...styles.paragraph, color: textColor }}>
            Change your system setting and MoneyIO will take care of the rest.
          </Text>

          <Text style={{ fontSize: 15, color: textColor, marginTop: 25 }}>
            That's all folks! Stay tuned for updates 🎉
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
