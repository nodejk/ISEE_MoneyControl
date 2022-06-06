import { FontAwesome } from "@expo/vector-icons";
import React, { useContext, useEffect, useRef, useState } from "react";
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
import {
  RootTabScreenProps,
  RootStackScreenProps,
  RootStackParamList,
} from "../../types";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { TransactionDescription } from "../../interface";
import { TransactionContext } from "../../store/TransactionContextProvider";
import { v4 as uuid } from "uuid";

import { FilterCategories } from "./FilterCategories";

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

interface navProps extends TransactionDescription {
  navigation: RootTabScreenProps<any>;
  navigation1: RootTabScreenProps<any>;
  scheduledTransactions: boolean;
  route: any;
}
export function TransactionList(navigation: navProps) {
  const colorScheme = useColorScheme();
  const textColor = colorScheme === "dark" ? "white" : "black";
  const cardBackground = colorScheme === "dark" ? "rgb(24, 24, 24)" : "white";
  const cardBorderColor =
    colorScheme === "dark" ? "rgb(40, 40, 40)" : "rgb(220, 220, 220)";
  const transactionContext = useContext(TransactionContext);

  function repeatedTransaction(transaction: TransactionDescription) {
    if (navigation.scheduledTransactions === true) {
      return transaction.repeatedTransaction;
    } else {
      return true;
    }
  }

  let userTransactions =
    transactionContext.userTransactions.filter(repeatedTransaction);

  // console.log("here-->", navigation.navigation1.route.params?.filters);

  if (navigation.navigation1.route.params !== undefined) {
    const filters = navigation.navigation1.route.params?.filters;
    // console.log(filters);

    // userTransactions = FilterCategories(filters, userTransactions);
    userTransactions = FilterCategories(filters, userTransactions);

    // console.log("here-->", userTransactions);
  }

  useEffect(() => {}, [userTransactions]);

  // console.log(userTransactions);
  return (
    <FlatList
      data={userTransactions}
      key={uuid()}
      renderItem={({ item }) => (
        <TransactionCard
          date={item.date}
          key={item.id}
          category={item.category}
          name={item.name}
          type={item.type}
          paymentAmount={item.paymentAmount}
          currency={item.currency}
          id={item.id}
          navigation={navigation.navigation1}
          navigationScreen={"AddTransaction"}
          repeatedTransaction={item.repeatedTransaction}
        ></TransactionCard>
      )}
      // ListHeaderComponent={() =>
      //   header === "" ? (
      //     <React.Fragment></React.Fragment>
      //   ) : (
      //     <Text
      //       style={{
      //         color: textColor,
      //         fontSize: 40,
      //         fontWeight: "bold",
      //       }}
      //     >
      //       {header}
      //     </Text>
      //   )
      // }
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
