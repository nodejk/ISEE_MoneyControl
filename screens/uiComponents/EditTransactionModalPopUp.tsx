import React, { useContext, useState } from "react";
import {
  Modal,
  View,
  StyleSheet,
  Text,
  useColorScheme,
  TouchableOpacity,
  TextInput,
  Switch,
} from "react-native";
import Colors from "../../constants/Colors";
import { category, paymentMethod } from "../../interface";
import { UserContext } from "../../store/UserContextProvider";
import { v4 as uuid } from "uuid";

interface propsInterface {
  itemToEdit: category | null;
  editmodalVisibilityHandler: () => void;
  resetItemHandler: () => void;
  editOrAddModalVisibility: boolean;
}

export function EditTransactionModalPopup(props: propsInterface) {
  const colorScheme = useColorScheme();

  const cardBackground = colorScheme === "dark" ? "rgb(24, 24, 24)" : "white";
  const cardBorderColor =
    colorScheme === "dark" ? "rgb(40, 40, 40)" : "rgb(220, 220, 220)";
  const margins = { marginTop: 18 };
  const textColor = colorScheme === "dark" ? "white" : "black";
  const userContext = useContext(UserContext);

  const [text, setText] = useState(
    props.itemToEdit === null ? "" : props.itemToEdit.name
  );
  const [categoryBudget, setCategoryBudget] = useState(
    props.itemToEdit === null ? false : props.itemToEdit.categoryBudgetSet
  );
  const [categoryBudgetLimit, setCategoryBudgetLimit] = useState(
    props.itemToEdit === null ? 0 : props.itemToEdit.categoryBudgetLimit
  );

  return (
    <View style={styles.modal}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.editOrAddModalVisibility}
        onRequestClose={() => {
          props.editmodalVisibilityHandler;
        }}
      >
        <View style={styles.modal}>
          <View
            style={{ ...styles.modalView, backgroundColor: cardBackground }}
          >
            <Text style={{ color: textColor, marginBottom: 20, fontSize: 20 }}>
              {props.itemToEdit === null ? "✨ Add ✨" : "Edit 😎"}
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
              placeholder={text}
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
                placeholder={categoryBudgetLimit.toString()}
                value={categoryBudgetLimit.toString()}
                keyboardType={"number-pad"}
                onChangeText={(txt) => {
                  console.log(txt);
                  setCategoryBudgetLimit(parseInt(txt === "" ? "0" : txt));
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
                  props.resetItemHandler();
                  props.editmodalVisibilityHandler();
                }}
              >
                <Text style={{ fontSize: 20, color: Colors["light"].tint }}>
                  cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ height: 30, marginHorizontal: 30 }}
                onPress={() => {
                  if (props.itemToEdit === null) {
                    const newCategoryId: string = uuid();
                    userContext.editUserDefinedCategories("add", {
                      id: newCategoryId,
                      name: text,
                      categoryBudgetLimit: categoryBudgetLimit,
                      categoryBudgetSet: categoryBudget,
                    });
                  } else {
                    console.log("text-->", text);
                    userContext.editUserDefinedCategories("edit", {
                      id: props.itemToEdit.id,
                      name: text === "" ? props.itemToEdit.name : text,
                      categoryBudgetLimit: categoryBudgetLimit,
                      categoryBudgetSet: categoryBudget,
                    });
                  }

                  console.log(
                    "budgetCategories->",
                    userContext.budgetCategories
                  );

                  props.editmodalVisibilityHandler();
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
