import React, { useCallback, useRef, useState } from "react";

import {
  ScrollView,
  StyleSheet,
  TextInput,
  StatusBar,
  KeyboardAvoidingView,
} from "react-native";

import { Text, View } from "../../components/Themed";
import { RootTabScreenProps } from "../../types";
import useColorScheme from "../../hooks/useColorScheme";
import { InputField } from "./InputField";
import { HeaderButton } from "./HeaderButtons";
import { TransactionDescription } from "../../interface";
import { useContext } from "react";
import { TransactionContext } from "../../store/TransactionContextProvider";
import { InputFieldsList } from "./InputFieldsList";
import { v4 as uuid } from "uuid";

const options = [
  { label: "-", value: "1" },
  { label: "+", value: "2" },
];

const defaultTransaction: TransactionDescription = {
  date: new Date(),
  category: "",
  name: "",
  type: "credit",
  paymentAmount: 0,
  paymentMethod: "",
  additionalNote: "",
  currency: "EURO",
  repeatedTransaction: false,
  id: "",
};

export function TransactionModal(navigation: RootTabScreenProps<any>) {
  const colorScheme = useColorScheme();

  const borderWidth = 1;
  const borderRadius = 9;

  console.log(navigation.route.params!.transactionType);

  const cardBackground = colorScheme === "dark" ? "rgb(24, 24, 24)" : "white";
  const cardBorderColor =
    colorScheme === "dark" ? "rgb(40, 40, 40)" : "rgb(220, 220, 220)";
  const margins = { marginTop: 18 };

  const transactionContext = useContext(TransactionContext);

  const transaction: TransactionDescription =
    navigation.route.params.transaction === undefined
      ? defaultTransaction
      : navigation.route.params!.transaction;

  const [category, setCategory] = useState(
    navigation.route.params!.category === undefined
      ? ""
      : navigation.route.params!.category
  );
  const [name, setName] = useState(
    navigation.route.params!.name === undefined
      ? ""
      : navigation.route.params!.name
  );
  const [type, setType] = useState(
    navigation.route.params!.type === undefined
      ? "debit"
      : navigation.route.params!.type
  );

  const [additionalNote, setAdditionalNote] = useState(
    navigation.route.params!.additionalNote === undefined
      ? ""
      : navigation.route.params!.additionalNote
  );

  // console.log();
  const [paymentMethod, setPaymentMethod] = useState(
    navigation.route.params!.paymentMethod === undefined
      ? ""
      : navigation.route.params!.paymentMethod
  );
  const [paymentAmount, setPaymentAmount] = useState(
    navigation.route.params!.paymentAmount === undefined
      ? ""
      : navigation.route.params!.paymentAmount
  );
  const [currency, setCurrency] = useState(
    navigation.route.params!.currency === undefined
      ? ""
      : navigation.route.params!.currency
  );

  const [day, setDay] = useState(
    navigation.route.params!.date === undefined
      ? transaction.date.getDate().toString()
      : navigation.route.params!.date.getDate().toString()
  );
  const [month, setMonth] = useState(transaction.date.getMonth().toString());
  const [year, setYear] = useState(transaction.date.getFullYear().toString());

  const inputFieldList = [
    {
      valueType: "text",
      value: name,
      name: "name",
      fieldName: "Name",
      requiredField: true,
      onChangeHandler: setName,
    },
    {
      valueType: "text",
      value: category,
      name: "category",
      fieldName: "Category",
      requiredField: true,
      onChangeHandler: setCategory,
    },
    {
      valueType: "text",
      value: paymentAmount,
      name: "paymentAmount",
      fieldName: "Payment Amount",
      requiredField: true,
      onChangeHandler: setPaymentAmount,
    },
    {
      valueType: "text",
      value: paymentMethod,
      name: "paymentMethod",
      fieldName: "Payment Method",
      requiredField: false,
      onChangeHandler: setPaymentMethod,
    },
    {
      valueType: "text",
      value: additionalNote,
      name: "additionalNote",
      fieldName: "Additional Note",
      requiredField: false,
      onChangeHandler: setAdditionalNote,
    },
    {
      valueType: "text",
      value: currency,
      name: "currency",
      fieldName: "Currency",
      requiredField: false,
      onChangeHandler: setCurrency,
    },
    {
      valueType: "text",
      value: type,
      name: "text",
      fieldName: "Type",
      requiredField: true,
      onChangeHandler: setType,
    },
  ];

  const onSubmitHandler = (val: any) => {
    console.log(val);
  };

  return (
    <KeyboardAvoidingView style={{ ...styles.container }}>
      <ScrollView>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            flexGrow: 1,
            paddingBottom: 20,
            alignContent: "center",
          }}
        >
          <HeaderButton
            name={"close"}
            size={40}
            {...margins}
            onPress={() => navigation.navigation.goBack()}
            color={"red"}
          ></HeaderButton>
          <HeaderButton
            name={"check"}
            size={40}
            {...margins}
            onPress={() => {
              const addtransaction: TransactionDescription = {
                date: new Date(Number(year), Number(month), Number(day)),
                category: category,
                name: name,
                type: type,
                paymentAmount: paymentAmount,
                paymentMethod: paymentMethod,
                additionalNote: additionalNote,
                currency: currency,
                repeatedTransaction: false,
                id: uuid(),
              };
              transactionContext.addTransaction(addtransaction);
              navigation.navigation.goBack();
            }}
            color={"green"}
          ></HeaderButton>
        </View>

        <InputFieldsList
          fieldList={inputFieldList}
          onSubmitHandler={onSubmitHandler}
        ></InputFieldsList>
        <View style={styles.dateContainer}>
          <TextInput
            value={day}
            placeholder={"day"}
            onChangeText={(text) => setDay(text)}
            keyboardType={"number-pad"}
            style={{
              borderWidth: borderWidth,
              borderColor: cardBorderColor,
              borderRadius: borderRadius,
              width: "30%",
              padding: 10,
              textAlign: "center",
            }}
          ></TextInput>
          <TextInput
            value={month}
            placeholder={"month"}
            onChangeText={(text) => setMonth(text)}
            keyboardType={"number-pad"}
            style={{
              borderWidth: borderWidth,
              borderColor: cardBorderColor,
              borderRadius: borderRadius,
              width: "30%",
              padding: 10,
              textAlign: "center",
            }}
          ></TextInput>
          <TextInput
            value={year}
            placeholder={"year"}
            onChangeText={(text) => setYear(text)}
            keyboardType={"number-pad"}
            style={{
              borderWidth: borderWidth,
              borderColor: cardBorderColor,
              borderRadius: borderRadius,
              width: "30%",
              padding: 10,
              textAlign: "center",
            }}
          ></TextInput>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    alignContent: "center",
  },
  scrollView: {},

  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  inputField: {
    fontSize: 15,
  },

  dateContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    alignSelf: "center",
    marginTop: 10,
  },
});

{
  /* <InputField
          name={"Payment Method"}
          backgroundColor={cardBackground}
          borderColor={cardBorderColor}
          borderTopWidth={borderWidth}
          borderHorizontalWidth={borderWidth}
          borderTopRadius={borderRadius}
          marginTop={30}
        >
          <TextInput
            style={styles.inputField}
            placeholder={"Optional"}
            value={""}
            keyboardType={"default"}
            keyboardAppearance={colorScheme}
          />
        </InputField>
        <InputField
          name={"Category"}
          backgroundColor={cardBackground}
          borderColor={cardBorderColor}
          borderTopWidth={borderWidth}
          borderHorizontalWidth={borderWidth}
          borderBottomWidth={borderWidth}
        >
          <TextInput
            style={styles.inputField}
            placeholder={"Optional"}
            value={""}
            keyboardType={"default"}
            keyboardAppearance={colorScheme}
          />
        </InputField>

        <InputField
          name={"Description"}
          backgroundColor={cardBackground}
          borderColor={cardBorderColor}
          borderTopWidth={borderWidth}
          borderHorizontalWidth={borderWidth}
          borderBottomRadius={borderRadius}
          borderBottomWidth={borderWidth}
        >
          <TextInput
            style={styles.inputField}
            placeholder={"Optional"}
            value={""}
            keyboardType={"default"}
            keyboardAppearance={colorScheme}
          />
        </InputField> */
}
