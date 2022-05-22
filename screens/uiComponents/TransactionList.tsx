import { FontAwesome } from "@expo/vector-icons";
import React, { useContext, useRef, useState } from "react";
import {
  FlatList,
  Animated,
  SafeAreaView,
  TouchableHighlight,
} from "react-native";
import { TransactionCard } from "./TransactionCard";
import {
  StyleSheet,
  useColorScheme,
  Text,
  View,
  ScrollView,
  Platform,
  StatusBar,
  Dimensions,
} from "react-native";
import { RootTabScreenProps, RootStackScreenProps } from "../../types";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { TransactionDescription } from "../../interface";
import { TransactionContext } from "../../store/TransactionContextProvider";

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

const myItemSeparator = () => {
  return (
    <View
      style={{ height: 1, backgroundColor: "gray", marginHorizontal: 10 }}
    />
  );
};

export function TransactionList(props: {
  navigation: RootTabScreenProps<any>;
  header: string;
}) {
  const colorScheme = useColorScheme();
  const textColor = colorScheme === "dark" ? "white" : "black";
  const cardBackground = colorScheme === "dark" ? "rgb(24, 24, 24)" : "white";
  const cardBorderColor =
    colorScheme === "dark" ? "rgb(40, 40, 40)" : "rgb(220, 220, 220)";
  const transactionContext = useContext(TransactionContext);
  console.log("transaction list-->", transactionContext.userTransactions[0]);

  return (
    <FlatList
      data={transactionContext.userTransactions}
      renderItem={({ item }) => (
        <TransactionCard
          date={item.date}
          category={item.category}
          name={item.name}
          type={item.type}
          paymentAmount={item.paymentAmount}
          currency={item.currency}
          id={item.id}
          navigation={props.navigation}
          navigationScreen={"AddTransaction"}
        ></TransactionCard>
      )}
      ListHeaderComponent={() =>
        props.header === "" ? (
          <React.Fragment></React.Fragment>
        ) : (
          <Text
            style={{
              color: textColor,
              fontSize: 40,
              fontWeight: "bold",
            }}
          >
            {props.header}
          </Text>
        )
      }
      ItemSeparatorComponent={myItemSeparator}
    ></FlatList>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    marginHorizontal: 1,
  },
});
