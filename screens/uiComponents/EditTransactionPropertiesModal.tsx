import React, { useCallback, useEffect, useRef, useState } from "react";

import {
  ScrollView,
  StyleSheet,
  TextInput,
  StatusBar,
  KeyboardAvoidingView,
  Button,
  Alert,
  FlatList,
  Switch,
  TouchableOpacity,
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
import Colors from "../../constants/Colors";

interface navProps extends TransactionDescription {
  navigation: RootTabScreenProps<any>;
  route?: any;
}

const myItemSeparator = () => {
  return (
    <View
      style={{ height: 1, backgroundColor: "gray", marginHorizontal: 10 }}
    />
  );
};

export function EditTransactionPropertiesModal(navigation: navProps) {
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

  const [itemToEdit, setItemToEdit] = useState(null);

  const [confirmDeleteModalVisibility, setConfirmDeleteModalVisibility] =
    useState(false);

  const [editOrAddModalVisibility, setEditOrAddModalVisibility] =
    useState(false);

  function editmodalVisibilityHandler() {
    setEditOrAddModalVisibility(!editOrAddModalVisibility);
  }

  function confirmDeleteModalVisibilityHandler() {
    setItemToEdit(null);
    setConfirmDeleteModalVisibility(!confirmDeleteModalVisibility);
  }

  function confirmDeleteModal() {
    // console.log(itemToEdit);
    return (
      <View style={styles.modal}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={confirmDeleteModalVisibility}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setConfirmDeleteModalVisibility(!confirmDeleteModalVisibility);
          }}
        >
          <View style={styles.modal}>
            <View
              style={{ ...styles.modalView, backgroundColor: cardBackground }}
            >
              <Text style={{ color: "red", marginBottom: 20, fontSize: 20 }}>
                Are you sure you want to delete {title.toLowerCase()}?
              </Text>

              <View
                style={{ backgroundColor: "transparent", marginBottom: 10 }}
              >
                <TouchableOpacity
                  style={{ height: 30, marginBottom: 10 }}
                  onPress={confirmDeleteModalVisibilityHandler}
                >
                  <Text style={{ fontSize: 20, color: Colors["light"].tint }}>
                    nuu! 🥺
                  </Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={{ height: 30 }}
                onPress={() => {
                  if (typeToEdit === "category") {
                    userContext.editUserDefinedCategories("delete", itemToEdit);
                  }
                  if (typeToEdit === "paymentMethod") {
                    userContext.editUserDefinedPaymentMethod(
                      "delete",
                      itemToEdit
                    );
                  }
                  if (typeToEdit === "curreny") {
                    // userContext.editUserDefinedCategories("delete", itemToEdit);
                  }

                  confirmDeleteModalVisibilityHandler();
                  setItemToEdit(null);
                }}
              >
                <Text style={{ fontSize: 20, color: Colors["light"].tint }}>
                  umm... yeah? 🙄
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  }

  const typeToEdit = navigation.route.params.type;

  const title =
    typeToEdit === "category"
      ? "Category"
      : typeToEdit === "paymentMethod"
      ? "Payment Method"
      : "";

  const propertiesToEdit =
    typeToEdit === "category"
      ? userContext.userDefinedCategory
      : typeToEdit === "paymentMethod"
      ? userContext.userDefinedPaymentMethod
      : userContext.userDefinedCurrencies;

  function editOrAddModal() {
    if (typeToEdit === "category") {
      console.log("itemToEdit-->", itemToEdit);
      const startingText = itemToEdit === null ? "" : itemToEdit.name;
      const [text, setText] = useState(startingText);

      let existingThreshold = null;

      if (itemToEdit !== null) {
        for (var i = 0; i < userContext.budgetCategories.length; i++) {
          if (userContext.budgetCategories[i].categoryId === itemToEdit.id) {
            existingThreshold = userContext.budgetCategories[i];
            break;
          }
        }
      }

      console.log("existingThreshold-->", existingThreshold);
      const [categoryBudget, setCategoryBudget] = useState(
        existingThreshold === null ? false : true
      );
      const [categoryThreshold, setCategoryBudgetThreshold] = useState(
        existingThreshold === null
          ? ""
          : existingThreshold.thresholdBudget.toString()
      );

      console.log(categoryBudget === null);

      // console.log(userContext.budgetCategoFaries);
      // console.log(userContext.userDefinedCategory);

      return (
        <View style={styles.modal}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={editOrAddModalVisibility}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setEditOrAddModalVisibility(!editOrAddModalVisibility);
            }}
          >
            <View style={styles.modal}>
              <View
                style={{ ...styles.modalView, backgroundColor: cardBackground }}
              >
                <Text
                  style={{ color: textColor, marginBottom: 20, fontSize: 20 }}
                >
                  {itemToEdit === null ? "✨ Add ✨" : "Edit 😎"}
                </Text>

                <TextInput
                  style={{
                    color: textColor,
                    ...styles.inputField,
                    borderColor: cardBorderColor,
                    borderWidth: 2,
                    borderRadius: 10,
                    padding: 10,
                    display: "flex",
                    position: "relative",
                    width: 250,

                    marginBottom: 20,
                  }}
                  placeholder={startingText}
                  value={text}
                  keyboardType={"default"}
                  onChangeText={(txt) => {
                    setText(txt);
                  }}
                />
                {!categoryBudget ? (
                  <Text
                    style={{ color: textColor, marginBottom: 10, fontSize: 19 }}
                  >
                    Want to set up a budget?
                  </Text>
                ) : (
                  <Text
                    style={{ color: textColor, marginBottom: 10, fontSize: 19 }}
                  >
                    Budget Set
                  </Text>
                )}
                <Switch
                  trackColor={{ false: "#767577", true: "#32CD32" }}
                  thumbColor={"#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={() => {
                    setCategoryBudget(!categoryBudget);
                  }}
                  style={{ marginBottom: 15 }}
                  value={categoryBudget}
                ></Switch>

                {categoryBudget ? (
                  <TextInput
                    style={{
                      color: textColor,
                      ...styles.inputField,
                      borderColor: cardBorderColor,
                      borderWidth: 2,
                      borderRadius: 10,
                      padding: 10,
                      display: "flex",
                      position: "relative",
                      width: 250,

                      marginBottom: 30,
                    }}
                    placeholder={existingThreshold?.thresholdBudget.toString()}
                    value={categoryThreshold.toString()}
                    keyboardType={"number-pad"}
                    onChangeText={(txt) => {
                      setCategoryBudgetThreshold(txt);
                    }}
                  />
                ) : null}
                <View
                  style={{
                    backgroundColor: "transparent",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    display: "flex",
                  }}
                >
                  <TouchableOpacity
                    style={{ height: 30, marginHorizontal: 30 }}
                    onPress={() => {
                      setItemToEdit(null);
                      setText("");
                      setCategoryBudget(false);
                      setCategoryBudgetThreshold("");
                      editmodalVisibilityHandler();
                    }}
                  >
                    <Text style={{ fontSize: 20, color: Colors["light"].tint }}>
                      cancel
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{ height: 30, marginHorizontal: 30 }}
                    onPress={() => {
                      if (itemToEdit === null) {
                        const newCategoryId: string = uuid();
                        userContext.editUserDefinedCategories("add", {
                          id: newCategoryId,
                          name: text,
                        });
                        if (categoryBudget) {
                          userContext.handleBudgetCategories(
                            "add",
                            newCategoryId,
                            categoryThreshold
                          );
                        }
                      } else {
                        userContext.editUserDefinedCategories("edit", {
                          id: itemToEdit.id,
                          name: text,
                        });
                      }

                      console.log(userContext.budgetCategories);
                      setText("");
                      editmodalVisibilityHandler();
                    }}
                  >
                    <Text style={{ fontSize: 20, color: Colors["light"].tint }}>
                      confirm
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      );
    }

    if (typeToEdit === "paymentMethod") {
      const startingText = itemToEdit === null ? "" : itemToEdit.name;
      const [text, setText] = useState(startingText);

      return (
        <KeyboardAvoidingView>
          <View style={styles.modal}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={editOrAddModalVisibility}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setEditOrAddModalVisibility(!editOrAddModalVisibility);
              }}
            >
              <View style={styles.modal}>
                <View
                  style={{
                    ...styles.modalView,
                    backgroundColor: cardBackground,
                  }}
                >
                  <Text
                    style={{ color: textColor, marginBottom: 20, fontSize: 20 }}
                  >
                    {itemToEdit === null ? "Add 💳" : "Edit 😎"}
                  </Text>

                  <TextInput
                    style={{
                      color: textColor,
                      ...styles.inputField,
                      borderColor: cardBorderColor,
                      borderWidth: 2,
                      borderRadius: 10,
                      padding: 10,
                      display: "flex",
                      position: "relative",
                      width: 250,

                      marginBottom: 30,
                    }}
                    placeholder={startingText}
                    value={text}
                    keyboardType={"default"}
                    onChangeText={(txt) => {
                      setText(txt);
                    }}
                  />
                  <View
                    style={{
                      backgroundColor: "transparent",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      display: "flex",
                    }}
                  >
                    <TouchableOpacity
                      style={{ height: 30, marginHorizontal: 30 }}
                      onPress={() => {
                        setItemToEdit(null);
                        setText("");
                        editmodalVisibilityHandler();
                      }}
                    >
                      <Text
                        style={{ fontSize: 20, color: Colors["light"].tint }}
                      >
                        cancel
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{ height: 30, marginHorizontal: 30 }}
                      onPress={() => {
                        if (itemToEdit === null) {
                          userContext.editUserDefinedPaymentMethod("add", {
                            id: uuid(),
                            name: text,
                          });
                        } else {
                          userContext.editUserDefinedPaymentMethod("edit", {
                            id: itemToEdit.id,
                            name: text,
                          });
                        }
                        setText("");
                        editmodalVisibilityHandler();
                      }}
                    >
                      <Text
                        style={{ fontSize: 20, color: Colors["light"].tint }}
                      >
                        confirm
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
          </View>
        </KeyboardAvoidingView>
      );
    }

    if (typeToEdit === "currency") {
      const startingText = itemToEdit === null ? "" : itemToEdit.name;

      const startingCurrencyConversion =
        itemToEdit === null ? "" : itemToEdit.conversionRateToEuro;

      const startingCurrencyLabel = itemToEdit === null ? "" : itemToEdit.label;

      const [text, setText] = useState(startingText);
      const [currencyConversion, setCurrencyConversion] = useState(
        startingCurrencyConversion
      );

      console.log(itemToEdit, startingCurrencyLabel);

      const [currencyLabel, setCurrencyLabel] = useState("");

      console.log(currencyLabel);
      return (
        <KeyboardAvoidingView>
          <View style={styles.modal}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={editOrAddModalVisibility}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setEditOrAddModalVisibility(!editOrAddModalVisibility);
              }}
            >
              <View style={styles.modal}>
                <View
                  style={{
                    ...styles.modalView,
                    backgroundColor: cardBackground,
                  }}
                >
                  <Text
                    style={{ color: textColor, marginBottom: 20, fontSize: 20 }}
                  >
                    {itemToEdit === null ? "Add 💸" : "Edit 😎"}
                  </Text>
                  <Text
                    style={{
                      color: textColor,
                      marginBottom: 10,
                      fontSize: 20,
                      alignSelf: "flex-start",
                    }}
                  >
                    Name
                  </Text>
                  <TextInput
                    style={{
                      color: textColor,
                      ...styles.inputField,
                      borderColor: cardBorderColor,
                      borderWidth: 2,
                      borderRadius: 10,
                      padding: 10,
                      display: "flex",
                      position: "relative",
                      width: 250,

                      marginBottom: 30,
                    }}
                    placeholder={startingText}
                    value={text}
                    keyboardType={"default"}
                    onChangeText={(txt) => {
                      setText(txt);
                    }}
                  />
                  <Text
                    style={{
                      color: textColor,
                      marginBottom: 10,
                      fontSize: 20,
                      alignSelf: "flex-start",
                    }}
                  >
                    Value
                  </Text>
                  <TextInput
                    style={{
                      color: textColor,
                      ...styles.inputField,
                      borderColor: cardBorderColor,
                      borderWidth: 2,
                      borderRadius: 10,
                      padding: 10,
                      display: "flex",
                      position: "relative",
                      width: 250,

                      marginBottom: 30,
                    }}
                    placeholder={startingCurrencyConversion.toString()}
                    value={currencyConversion.toString()}
                    keyboardType={"number-pad"}
                    onChangeText={(txt) => {
                      setCurrencyConversion(txt);
                    }}
                  />
                  <Text
                    style={{
                      color: textColor,
                      marginBottom: 10,
                      fontSize: 20,
                      alignSelf: "flex-start",
                    }}
                  >
                    Symbol
                  </Text>
                  <TextInput
                    style={{
                      color: textColor,
                      ...styles.inputField,
                      borderColor: cardBorderColor,
                      borderWidth: 2,
                      borderRadius: 10,
                      padding: 10,
                      display: "flex",
                      position: "relative",
                      width: 250,

                      marginBottom: 30,
                    }}
                    placeholder={startingCurrencyLabel}
                    value={currencyLabel}
                    keyboardType={"default"}
                    onChangeText={(txt) => {
                      setCurrencyLabel(txt);
                    }}
                  />
                  <View
                    style={{
                      backgroundColor: "transparent",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      display: "flex",
                    }}
                  >
                    <TouchableOpacity
                      style={{ height: 30, marginHorizontal: 30 }}
                      onPress={() => {
                        setItemToEdit(null);
                        setText("");
                        setCurrencyConversion("");
                        setCurrencyLabel("");
                        editmodalVisibilityHandler();
                      }}
                    >
                      <Text
                        style={{ fontSize: 20, color: Colors["light"].tint }}
                      >
                        cancel
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{ height: 30, marginHorizontal: 30 }}
                      onPress={() => {
                        if (itemToEdit === null) {
                          userContext.editUserDefinedCurrencies("add", {
                            id: uuid(),
                            name: text,
                            conversionRateToEuro: currencyConversion,
                            label: currencyLabel,
                          });
                        } else {
                          userContext.editUserDefinedCurrencies("edit", {
                            id: itemToEdit.id,
                            name: text,
                            conversionRateToEuro: currencyConversion,
                            label: currencyLabel,
                          });
                        }
                        setText("");
                        setCurrencyConversion("");
                        setCurrencyLabel("");
                        editmodalVisibilityHandler();
                      }}
                    >
                      <Text
                        style={{ fontSize: 20, color: Colors["light"].tint }}
                      >
                        confirm
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
          </View>
        </KeyboardAvoidingView>
      );
    }
  }

  return (
    <KeyboardAvoidingView style={{ ...styles.container }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          flexGrow: 1,
        }}
      >
        <HeaderButton
          name={"arrow-left"}
          size={30}
          {...margins}
          onPress={() => {
            navigation.navigation.goBack();
          }}
          color={"blue"}
        ></HeaderButton>
      </View>

      <Button
        title={`Add ${title}`}
        onPress={editmodalVisibilityHandler}
      ></Button>

      <FlatList
        data={propertiesToEdit}
        key={uuid()}
        renderItem={({ item }) => (
          <View
            key={uuid()}
            style={{
              flexDirection: "row",
              display: "flex",
              margin: 10,
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{ fontSize: 20 }}
              onPress={() => {
                setItemToEdit(item);
                editmodalVisibilityHandler();
              }}
            >
              {item.name}
            </Text>
            <HeaderButton
              name={"trash-can"}
              size={20}
              marginBottom={0}
              marginLeft={0}
              marginTop={0}
              onPress={() => {
                setItemToEdit(item);
                confirmDeleteModalVisibilityHandler();
              }}
              color={"red"}
            ></HeaderButton>
          </View>
        )}
        ItemSeparatorComponent={myItemSeparator}
      ></FlatList>
      {confirmDeleteModal()}
      {editOrAddModal()}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
  },
  scrollView: {},

  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  inputField: {
    fontSize: 20,
  },

  modal: {
    flex: 1,

    // justifyContent: "center",
    alignItems: "center",
    marginTop: "40%",
    backgroundColor: "transparent",
  },

  modalView: {
    margin: 20,
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
