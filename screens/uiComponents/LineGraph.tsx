import React, { useEffect, useReducer, useState } from "react";
import { useWindowDimensions, View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { TransactionDescription } from "../../interface";

const chartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0,
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  decimalPlaces: 0,
  useShadowColorFromDataset: true, // optional
};

function transactionCompiler(transactions: TransactionDescription[]) {
  const today = new Date();
  const prior30Date = new Date(new Date().setDate(today.getDate() - 30));

  console.log(prior30Date);
  const prior30DaysTransactions = transactions.filter((transaction) => {
    console.log(transaction.date.getTime(), prior30Date.getTime());
    return transaction.date.getTime() >= prior30Date.getTime();
  });

  console.log("here-->", prior30DaysTransactions);

  var result = [] as any[];
  var label = [] as any[];
  var index = 0;

  const day = new Date(new Date().setDate(today.getDate() - 30));
  result.push({ labels: day, amount: 0 });

  for (var i = 29; i >= 0; i--) {
    const day = new Date(new Date().setDate(today.getDate() - i));
    var lastAmount = result[result.length - 1].amount;
    console.log(day);
    const transactionsPresent = prior30DaysTransactions.filter((value) => {
      return value.date.toDateString() === day.toDateString();
    });
    if (transactionsPresent.length === 0) {
      // console.log("no transactions", day, lastAmount);
      result.push({
        labels:
          day.getDate().toString() +
          "-" +
          day.toLocaleString("default", { month: "short" }),
        amount: lastAmount,
      });
    } else {
      // console.log(
      // "transactions",
      // day.toDateString(),
      // lastAmount,
      // transactionsPresent
      // );
      lastAmount += transactionsPresent.reduce((acc, value) => {
        // console.log(value.type);
        if (value.type.type == "credit") {
          acc += value.paymentAmount * value.currency.conversionRateToEuro;
        } else {
          acc -= value.paymentAmount * value.currency.conversionRateToEuro;
        }

        return acc;
      }, 0);

      // console.log(lastAmount);

      result.push({
        labels:
          day.getDate().toString() +
          "-" +
          day.toLocaleString("default", { month: "short" }),
        amount: lastAmount,
      });
    }
  }

  console.log(result);

  return result;
}

export function LineGraph(props: { data: any[] }) {
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;

  const compiledTrx = transactionCompiler(props.data);
  // console.log(props.data);
  let labels = [];
  let data = [];

  for (var i = 0; i < compiledTrx.length; i++) {
    data.push(Math.round(compiledTrx[i].amount));
    labels.push(compiledTrx[i].labels);
  }
  useEffect(() => {}, props.data);
  return (
    <View>
      <LineChart
        data={{
          labels: labels,
          datasets: [
            {
              data: data,
            },
          ],
        }}
        width={windowWidth} // from react-native
        height={400}
        yAxisLabel="€"
        verticalLabelRotation={110}
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={chartConfig}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
          padding: 10,
        }}
        formatXLabel={(value) =>
          labels.length > 2
            ? labels[1] == value ||
              labels[labels.length - 2] == value ||
              labels[labels.length / 2] == value ||
              labels[labels.length / 2 + 0.5] == value
              ? value
              : ""
            : value
        }
      />
    </View>
  );
}
function useForceUpdate() {
  throw new Error("Function not implemented.");
}
