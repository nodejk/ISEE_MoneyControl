import React from "react";
import { useWindowDimensions } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { TransactionDescription } from "../../interface";

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function groupBy(list: any[]) {
  var result = [];

  list.reduce(function (res, value) {
    // console.log(value.category.name);
    if (!res[value.category.name]) {
      var color =
        "rgb(" +
        getRandomNumber(0, 255).toString() +
        ", " +
        getRandomNumber(0, 255).toString() +
        ", " +
        getRandomNumber(0, 255).toString() +
        ")";
      res[value.category.name] = {
        name: value.category.name,
        amount: 0,
        color: color,
        legendFontSize: 15,
        legendFontColor: "#7F7F7F",
      };
      result.push(res[value.category.name]);
    }
    res[value.category.name].amount += parseFloat(
      value.paymentAmount * value.currency.conversionRateToEuro
    );

    return res;
  }, {});

  return result;
}

const chartConfig = {
  backgroundColor: "#ffffff",
  backgroundGradientFrom: "#ffffff",
  backgroundGradientTo: "#ffffff",
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
};

export function PieChartGraph(props: { data: TransactionDescription[] }) {
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;

  const data = groupBy(props.data);

  // console.log(data);
  return (
    <PieChart
      data={data}
      width={windowWidth}
      height={220}
      chartConfig={chartConfig}
      accessor={"amount"}
      backgroundColor={"transparent"}
      paddingLeft={"15"}
      center={[0, 0]}
    />
  );
}
