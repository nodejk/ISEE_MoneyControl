import { StatusBar, StyleSheet, useColorScheme } from "react-native";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import React, { useContext } from "react";
import { TransactionList } from "./uiComponents/TransactionList";
import { AccountBalanceCard } from "./uiComponents/AccountBalanceCard";
import { TransactionContext } from "../store/TransactionContextProvider";

export default function TabOneScreen(navigation: RootTabScreenProps<any>) {
  const colorScheme = useColorScheme();
  const textColor = colorScheme === "dark" ? "white" : "black";
  // const userCtx = useContext(UserContext);
  const transactionContext = useContext(TransactionContext);
  const amount = transactionContext.userTransactions.reduce(
    (element, object) => {
      console.log(object);
      return (
        element +
        (object.type.type === "credit" ? 1 : -1) *
          object.paymentAmount *
          object.currency.conversionRateToEuro
      );
    },
    0
  );

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
      <AccountBalanceCard
        amount={amount}
        currency={"EURO"}
      ></AccountBalanceCard>
      <TransactionList
        navigation1={navigation}
        header={""}
        scheduledTransactions={false}
      ></TransactionList>
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
