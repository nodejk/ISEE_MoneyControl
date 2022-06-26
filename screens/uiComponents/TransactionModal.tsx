import React, { useCallback, useRef, useState } from "react";

import {
  ScrollView,
  StyleSheet,
  TextInput,
  StatusBar,
  KeyboardAvoidingView,
  Button,
  Alert,
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
import "react-native-get-random-values";
import { v4 as uuid } from "uuid";
import { Modal } from "react-native";
import { UserContext } from "../../store/UserContextProvider";

const options = [
  { label: "-", value: "1" },
  { label: "+", value: "2" },
];

const defaultTransaction: TransactionDescription = {
  date: new Date(),
  category: {
    id: "1",
    name: "Rent",
    categoryBudgetLimit: 0,
    categoryBudgetSet: false,
  },
  name: "",
  type: { id: "2", name: "Credit 🤑", type: "credit" },
  paymentAmount: 0,
  paymentMethod: { id: "1", name: "card" },
  additionalNote: "",
  currency: { id: "2", name: "EURO", conversionRateToEuro: 1, label: "€" },
  repeatedTransaction: false,
  id: "",
};

interface navProps extends TransactionDescription {
  navigation: RootTabScreenProps<any>;
  route: any;
}

export function TransactionModal(navigation: navProps) {
  const colorScheme = useColorScheme();

  const borderWidth = 1;
  const borderRadius = 9;

  // console.log(navigation);

  const cardBackground = colorScheme === "dark" ? "rgb(24, 24, 24)" : "white";
  const cardBorderColor =
    colorScheme === "dark" ? "rgb(40, 40, 40)" : "rgb(220, 220, 220)";
  const margins = { marginTop: 18 };
  const textColor = colorScheme === "dark" ? "white" : "black";

  const transactionContext = useContext(TransactionContext);
  const userContext = useContext(UserContext);

  function checkOverBudget(categoryId: string, paymentAmount: number) {
    const usertransaction = transactionContext.userTransactions;

    const userCategorySpent = usertransaction.reduce((a, b) => {
      if (b.type.name === "Debit 😢" && b.category.id === categoryId) {
        return a + b.paymentAmount;
      } else {
        return a;
      }
    }, 0);

    console.log("userCategorySpent-->?", userCategorySpent);
    const categoryBudget = userContext.userDefinedCategory.filter(
      (item) => item.id === categoryId
    )[0];

    const categoryBudgetLimit = categoryBudget.categoryBudgetLimit;

    console.log("----->", paymentAmount, categoryBudgetLimit);
    console.log(
      "----->",
      userCategorySpent + paymentAmount > categoryBudgetLimit
    );
    if (userCategorySpent + paymentAmount > categoryBudgetLimit) {
      return true;
    }
    return false;
  }

  const [modalVisible, setModalVisible] = useState(false);
  const [overBudgetAlert, setOverBudgetAlert] = useState(false);

  const transaction: TransactionDescription =
    navigation.route.params?.transaction === undefined
      ? defaultTransaction
      : navigation.route.params!.transaction;

  const [category, setCategory] = useState(
    navigation.route.params?.category === undefined
      ? transaction.category
      : navigation.route.params!.category
  );
  const [name, setName] = useState(
    navigation.route.params?.name === undefined
      ? ""
      : navigation.route.params!.name
  );
  const [type, setType] = useState(
    navigation.route.params?.type === undefined
      ? { id: "2", name: "Credit 🤑", type: "credit" }
      : navigation.route.params!.type
  );

  const [additionalNote, setAdditionalNote] = useState(
    navigation.route.params?.additionalNote === undefined
      ? ""
      : navigation.route.params!.additionalNote
  );

  // const id = ;
  console.log(navigation.route.params);

  const [paymentMethod, setPaymentMethod] = useState(
    navigation.route.params?.paymentMethod === undefined
      ? transaction.paymentMethod
      : navigation.route.params!.paymentMethod
  );
  const [paymentAmount, setPaymentAmount] = useState(
    navigation.route.params?.paymentAmount === undefined
      ? 0
      : navigation.route.params!.paymentAmount
  );
  const [currency, setCurrency] = useState(
    navigation.route.params?.currency === undefined
      ? transaction.currency
      : navigation.route.params!.currency
  );

  const [day, setDay] = useState(
    navigation.route.params?.date === undefined
      ? transaction.date.getDate().toString()
      : navigation.route.params!.date.getDate().toString()
  );
  const [month, setMonth] = useState(
    navigation.route.params?.date === undefined
      ? (transaction.date.getMonth() + 1).toString()
      : (navigation.route.params!.date.getMonth() + 1).toString()
  );
  const [year, setYear] = useState(
    navigation.route.params?.date === undefined
      ? transaction.date.getFullYear().toString()
      : navigation.route.params!.date.getFullYear().toString()
  );

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
      selectionProps: {
        selectionOptions: userContext.userDefinedCategory,
      },
    },
    {
      valueType: "number",
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
      selectionProps: {
        selectionOptions: userContext.userDefinedPaymentMethod,
      },
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
      selectionProps: {
        selectionOptions: userContext.userDefinedCurrencies,
      },
    },
    {
      valueType: "text",
      value: type,
      name: "text",
      fieldName: "Type",
      requiredField: true,
      onChangeHandler: setType,
      selectionProps: {
        selectionOptions: userContext.userDefinedTransactionType,
      },
    },
  ];

  function modalVisibilityHandler() {
    setModalVisible(!modalVisible);
  }

  function overBudgetAlertHandler() {
    setOverBudgetAlert(!overBudgetAlert);
  }

  function checkValidity(day: string, month: string, year: string) {
    if (day === "" && month === "" && year === "") {
      return true;
    }
    const dateString =
      year.toString() +
      "-" +
      (month.toString().length === 1
        ? "0" + month.toString()
        : month.toString()) +
      "-" +
      (day.toString().length === 1 ? "0" + day.toString() : day.toString());
    const date = Date.parse(dateString);

    return !isNaN(date);
  }

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
            size={30}
            {...margins}
            onPress={() => {
              navigation.navigation.goBack();
            }}
            color={"blue"}
          ></HeaderButton>
          {navigation.route.params!.transactionType === "editTransaction" && (
            <HeaderButton
              color={"red"}
              name={"trash-can-outline"}
              {...margins}
              size={30}
              onPress={() => {
                transactionContext.removeTransaction(
                  navigation.route.params!.id
                );
                navigation.navigation.goBack();
              }}
            ></HeaderButton>
          )}

          <HeaderButton
            name={"check"}
            size={30}
            {...margins}
            onPress={() => {
              if (checkValidity(day, month, year)) {
                const addtransaction: TransactionDescription = {
                  date: new Date(Number(year), Number(month) - 1, Number(day)),
                  category: category,
                  name: name,
                  type: type,
                  paymentAmount: paymentAmount,
                  paymentMethod: paymentMethod,
                  additionalNote: additionalNote,
                  currency: currency,
                  repeatedTransaction:
                    navigation.route.params?.scheduleTransaction === undefined
                      ? false
                      : true,
                  id:
                    navigation.route.params!.transactionType ===
                    "editTransaction"
                      ? navigation.route.params!.id
                      : uuid(),
                };

                if (checkOverBudget(category.id, paymentAmount)) {
                  overBudgetAlertHandler();
                } else {
                  if (
                    navigation.route.params!.transactionType ===
                    "editTransaction"
                  ) {
                    transactionContext.editTransaction(addtransaction);
                  } else {
                    transactionContext.addTransaction(addtransaction);
                  }
                  navigation.navigation.goBack();
                }
              } else {
                modalVisibilityHandler();
              }
            }}
            color={"green"}
          ></HeaderButton>
        </View>

        <InputFieldsList fieldList={inputFieldList}></InputFieldsList>
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
              color: textColor,
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
              color: textColor,
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
              color: textColor,
            }}
          ></TextInput>
        </View>

        <View style={styles.modal}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.modal}>
              <View style={styles.modalView}>
                <Text style={{ color: "red", marginBottom: 20, fontSize: 15 }}>
                  Please add a valid date... 😣
                </Text>
                <Button
                  onPress={modalVisibilityHandler}
                  title={"Close"}
                ></Button>
              </View>
            </View>
          </Modal>
        </View>

        <View style={styles.modal}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={overBudgetAlert}
            onRequestClose={overBudgetAlertHandler}
          >
            <View style={styles.modal}>
              <View style={styles.modalView}>
                <Text style={{ color: "red", marginBottom: 20, fontSize: 15 }}>
                  woooh! you have crossed the budget! 😜
                </Text>
                <Button
                  onPress={overBudgetAlertHandler}
                  title={"Close"}
                ></Button>
              </View>
            </View>
          </Modal>
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

  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: "transparent",
  },

  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
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
