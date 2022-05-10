import React from "react";
import {
  StatusBar,
  StyleSheet,
  View,
  Text,
  useColorScheme,
} from "react-native";
import { getCurrencySymbol } from "./CurrencyConverter";

export function AccountBalanceCard(props: {
  amount: number;
  currency: string;
}) {
  const colorScheme = useColorScheme();

  const colorText = colorScheme === "dark" ? "white" : "black";
  const sign = props.amount < 0 ? "-" : props.amount === 0 ? "" : "+";
  const cardBorderColor =
    colorScheme === "dark" ? "rgb(40, 40, 40)" : "rgb(220, 220, 220)";
  const cardBackground = colorScheme === "dark" ? "rgb(24, 24, 24)" : "white";

  return (
    <View
      style={{
        borderColor: cardBorderColor,
        backgroundColor: cardBackground,
        ...styles.container,
      }}
    >
      <Text style={{ color: colorText, fontSize: 20 }}>
        {sign}
        {getCurrencySymbol(props.currency)}
        {Math.abs(props.amount)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 1,
    padding: 20,
    marginHorizontal: 20,
  },
  cardStyle: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
