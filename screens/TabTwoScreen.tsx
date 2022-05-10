import { StatusBar, StyleSheet, useColorScheme } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { TransactionDescription } from "../interface";
import React from "react";
import { TransactionList } from "./uiComponents/TransactionList";
import { AccountBalanceCard } from "./uiComponents/AccountBalanceCard";
import { useWindowDimensions } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { LineGraph } from "./uiComponents/LineGraph";
import { PieChartGraph } from "./uiComponents/PieChartGraph";

const DUMMY_TRANSACTIONS = [
  { id: 1, name: "expense1", amount: 10, type: "debit" },
  { id: 2, name: "expense2", amount: 30, type: "debit" },
  { id: 3, name: "expense3", amount: 100, type: "credit" },
  { id: 4, name: "expense4", amount: 40, type: "debit" },
  { id: 5, name: "expense5", amount: 30, type: "credit" },
  { id: 6, name: "expense1", amount: 10, type: "debit" },
  { id: 7, name: "expense2", amount: 30, type: "debit" },
  { id: 8, name: "expense3", amount: 100, type: "credit" },
  { id: 9, name: "expense4", amount: 40, type: "debit" },
  { id: 10, name: "expense5", amount: 30, type: "credit" },
  { id: 11, name: "expense1", amount: 10, type: "debit" },
  { id: 12, name: "expense2", amount: 30, type: "debit" },
  { id: 13, name: "expense3", amount: 100, type: "credit" },
  { id: 14, name: "expense4", amount: 40, type: "debit" },
  { id: 15, name: "expense5", amount: 30, type: "credit" },
  { id: 16, name: "expense1", amount: 10, type: "debit" },
  { id: 17, name: "expense2", amount: 30, type: "debit" },
  { id: 18, name: "expense3", amount: 100, type: "credit" },
  { id: 19, name: "expense4", amount: 40, type: "debit" },
  { id: 20, name: "expense5", amount: 30, type: "credit" },
  { id: 21, name: "expense1", amount: 10, type: "debit" },
  { id: 22, name: "expense2", amount: 30, type: "debit" },
  { id: 23, name: "expense3", amount: 100, type: "credit" },
  { id: 24, name: "expense4", amount: 40, type: "debit" },
  { id: 25, name: "expense5", amount: 30, type: "credit" },
  { id: 26, name: "expense1", amount: 10, type: "debit" },
  { id: 27, name: "expense2", amount: 30, type: "debit" },
  { id: 28, name: "expense3", amount: 100, type: "credit" },
  { id: 29, name: "expense4", amount: 40, type: "debit" },
  { id: 30, name: "expense5", amount: 30, type: "credit" },
];

export default function TabOneScreen({ navigation }: RootTabScreenProps<any>) {
  const colorScheme = useColorScheme();
  const textColor = colorScheme === "dark" ? "white" : "black";
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;

  const colorText = colorScheme === "dark" ? "white" : "black";
  const cardBorderColor =
    colorScheme === "dark" ? "rgb(40, 40, 40)" : "rgb(220, 220, 220)";
  const cardBackground = colorScheme === "dark" ? "rgb(24, 24, 24)" : "white";
  const backGround = colorScheme === "dark" ? "black" : "white";

  return (
    <ScrollView style={{ backgroundColor: backGround }}>
      <Text
        style={{
          color: textColor,
          fontSize: 40,
          fontWeight: "bold",
          marginBottom: 15,
          marginLeft: 17,
        }}
      >
        Charts
      </Text>
      <View style={styles.container}>
        <LineGraph></LineGraph>
        <View
          style={{ borderColor: cardBorderColor, ...styles.pieChartContainer }}
        >
          <PieChartGraph></PieChartGraph>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    marginHorizontal: 1,
    alignItems: "center",
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
  pieChartContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginHorizontal: 15,
  },
});
