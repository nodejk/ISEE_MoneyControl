import React from "react";
import { useColorScheme, View, StyleSheet } from "react-native";
import { Card, Text } from "react-native-paper";
import { TransactionDescription } from "../../interface";
import { Pressable } from "react-native";
import { RootTabScreenProps } from "../../types";
import { getCurrencySymbol } from "./CurrencyConverter";

interface navProps extends TransactionDescription {
  navigationScreen: any;
  navigation: any;
}

export function TransactionCard(props: navProps) {
  const colorScheme = useColorScheme();

  const textColor = colorScheme === "dark" ? "white" : "black";
  const cardBackground = colorScheme === "dark" ? "rgb(24, 24, 24)" : "white";

  const transactionTypeColor =
    props.type === "credit" ? "rgb(0,255,127)" : "rgb(255,69,0)";
  const sign = props.type === "credit" ? "+" : "-";

  //   get it from user state
  const currency = props.currency;

  return (
    <Pressable
      onPress={() =>
        props.navigation?.navigate(props.navigationScreen!, {
          amount: props.paymentAmount,
          name: props.name,
          type: props.type,
          date: props.date,
          category: props.category,
          paymentAmount: props.paymentAmount,
          paymentMethod: props.paymentMethod,
          additionalNote: props.additionalNote,
          id: props.id,
          currency: props.currency,
          repeatedTransaction: props.repeatedTransaction,
          transactionType: "editTransaction",
        })
      }
    >
      <View style={styles.item}>
        <Text style={{ color: textColor, ...styles.name }}>{props.name}</Text>
        <Text style={{ color: transactionTypeColor, ...styles.price }}>
          {sign}
          {getCurrencySymbol(currency)}
          {props.paymentAmount}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  item: {
    marginVertical: 8,
    marginHorizontal: 16,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
  },

  name: {
    fontSize: 20,
  },

  price: {
    fontSize: 16,
  },
});
