import { StatusBar, StyleSheet, useColorScheme } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { TransactionDescription } from "../interface";
import React, { useContext } from "react";
import { TransactionList } from "./uiComponents/TransactionList";
import { AccountBalanceCard } from "./uiComponents/AccountBalanceCard";
import { TransactionContext } from "../store/TransactionContextProvider";

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

  return (
    <View style={styles.container}>
      <Text
        style={{
          color: textColor,
          fontSize: 40,
          fontWeight: "bold",
          marginBottom: 15,
          marginLeft: 17,
        }}
      >
        My expenses
      </Text>
      <AccountBalanceCard amount={-10} currency={"EURO"}></AccountBalanceCard>
      <TransactionList navigation={navigation} header={""}></TransactionList>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    marginHorizontal: 1,
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
});
