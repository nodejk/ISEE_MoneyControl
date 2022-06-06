import React, { useContext, useEffect, useState } from "react";
// import SwitchSelector from "react-native-switch-selector";

import {
  ScrollView,
  StyleSheet,
  TextInput,
  StatusBar,
  DatePickerIOSBase,
  Button,
  Modal,
  Alert,
  Pressable,
} from "react-native";

import { Text, View } from "../../components/Themed";
import { RootTabScreenProps } from "../../types";
import useColorScheme from "../../hooks/useColorScheme";
// import RNDateTimePicker from "@react-native-community/datetimepicker";
// import DateTimePicker from "react-native-modal-datetime-picker";
import { HeaderButton } from "./HeaderButtons";
import { UserContext } from "../../store/UserContextProvider";
import { InputFieldsList } from "./InputFieldsList";

const options = [
  { label: "-", value: "1" },
  { label: "+", value: "2" },
];
export function FilterModal(navigation: RootTabScreenProps<any>) {
  const colorScheme = useColorScheme();
  const textColor = colorScheme === "dark" ? "white" : "black";
  const borderWidth = 1;

  const cardBackground = colorScheme === "dark" ? "rgb(24, 24, 24)" : "white";
  const cardBorderColor =
    colorScheme === "dark" ? "rgb(40, 40, 40)" : "rgb(220, 220, 220)";

  const userContext = useContext(UserContext);

  const [modalVisible, setModalVisible] = useState(false);

  const margins = { marginTop: 18 };

  const borderRadius = 9;

  const [fromDay, setFromDay] = useState("");
  const [fromMonth, setFromMonth] = useState("");
  const [fromYear, setFromYear] = useState("");

  const [toDay, setToDay] = useState("");
  const [toMonth, setToMonth] = useState("");
  const [toYear, setToYear] = useState("");

  const [category, setCategory] = useState([] as string[]);
  const [minPaymentAmount, setMinPaymentAmount] = useState(0);
  const [maxPaymentAmount, setMaxPaymentAmount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState([] as string[]);

  function resetFilter() {
    setFromDay("");
    setFromMonth("");
    setFromYear("");

    setToDay("");
    setToMonth("");
    setToYear("");

    setCategory([]);
    setMinPaymentAmount(0);
    setMaxPaymentAmount(0);

    setPaymentMethod([]);
  }

  function modalVisibilityHandler() {
    setModalVisible(!modalVisible);
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

  function submitCategoryList(optionsSelected: string[]) {
    setCategory(optionsSelected);
  }

  function submitPaymentMethodList(optionsSelected: string[]) {
    setPaymentMethod(optionsSelected);
  }

  const filterFieldList = [
    {
      valueType: "text",
      value: "",
      name: "category",
      fieldName: "Category",
      requiredField: true,
      selectionProps: {
        selectionOptions: userContext.userDefinedCategory,
        submitHandler: submitCategoryList,
        selectedOptions: category,
      },
    },
    {
      valueType: "number",
      value: minPaymentAmount,
      name: "paymentAmount",
      fieldName: "Min Amount",
      requiredField: false,
      onChangeHandler: setMinPaymentAmount,
    },
    {
      valueType: "number",
      value: maxPaymentAmount,
      name: "paymentAmount",
      fieldName: "Max Amount",
      requiredField: false,
      onChangeHandler: setMaxPaymentAmount,
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
        submitHandler: submitPaymentMethodList,
        selectedOptions: paymentMethod,
      },
    },
  ];

  // console.log(navigation.route.params!.navigateTo);

  const navigateTo = navigation.route.params!.navigateTo;

  const filters = {
    fromDate: { day: fromDay, month: fromMonth, year: fromYear },
    toDate: { date: toDay, month: toMonth, year: toMonth },
    paymentAmount: {
      minPaymentAmount: minPaymentAmount,
      maxPaymentAmount: maxPaymentAmount,
    },
    paymentMethod: paymentMethod,
    category: category,
  };

  return (
    <View style={{ ...styles.container }}>
      <ScrollView>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            flexGrow: 1,
            paddingBottom: 20,
          }}
        >
          <HeaderButton
            name={"close"}
            size={30}
            {...margins}
            onPress={() => navigation.navigation.goBack()}
            color={"blue"}
          ></HeaderButton>
          <HeaderButton
            name={"check"}
            size={30}
            {...margins}
            color={"green"}
            onPress={() => {
              if (
                checkValidity(fromDay, fromMonth, fromYear) &&
                checkValidity(toDay, toMonth, toYear)
              ) {
                navigation.navigation.navigate({
                  name: navigateTo,
                  params: { filters: filters },
                });
              } else {
                modalVisibilityHandler();
              }
            }}
          ></HeaderButton>
        </View>

        <View style={{ ...styles.dateContainer }}>
          <Text style={{ color: textColor, marginBottom: 10, fontSize: 15 }}>
            From
          </Text>

          <View style={{ flexDirection: "row" }}>
            <TextInput
              value={fromDay}
              placeholder={"day"}
              onChangeText={(text) => setFromDay(text)}
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
              value={fromMonth}
              placeholder={"month"}
              onChangeText={(text) => setFromMonth(text)}
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
              value={fromYear}
              placeholder={"year"}
              onChangeText={(text) => setFromYear(text)}
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
        </View>

        <View
          style={{ ...styles.dateContainer, marginTop: 15, marginBottom: 30 }}
        >
          <Text style={{ color: textColor, marginBottom: 10, fontSize: 15 }}>
            To
          </Text>
          <View style={{ flexDirection: "row" }}>
            <TextInput
              value={toDay}
              placeholder={"day"}
              onChangeText={(text) => setToDay(text)}
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
              value={toMonth}
              placeholder={"month"}
              onChangeText={(text) => setToMonth(text)}
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
              value={toYear}
              placeholder={"year"}
              onChangeText={(text) => setToYear(text)}
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
        </View>

        <InputFieldsList fieldList={filterFieldList}></InputFieldsList>

        <View style={{ marginTop: 15 }}>
          <Button onPress={resetFilter} title={"Reset Filters"}></Button>
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
      </ScrollView>
    </View>
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
    display: "flex",
    flexDirection: "column",
    width: "80%",
    alignSelf: "center",
    marginTop: 10,
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

  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: "transparent",
  },
});
