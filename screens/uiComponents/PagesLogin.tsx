import React from "react";
import { View, Text, TextInput, Button, StyleSheet, Modal } from "react-native";
import { Feather as Icon, FontAwesome } from "@expo/vector-icons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { InputField } from "./InputField";

export const PageLogin = ({
  backgroundColor,
  iconName,
  title,
  children,
  startingScreenHandler,
}) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function emailHandler(txt: string) {
    setEmail(txt);
  }

  function passwordHandler(txt: string) {
    setPassword(txt);
  }

  function emailValidator(email: string) {
    let regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;

    return regEmail.test(email);
  }

  const [invalidCredentials, setInvalidCredentials] = React.useState(false);

  function credentialValidator(email: string, password: string) {
    setInvalidCredentials(!(emailValidator(email) && password.length >= 6));
  }
  function signupHandler() {
    console.log("{here");
    credentialValidator(email, password);
    console.log(invalidCredentials);

    startingScreenHandler();
  }

  function modalVisibilityHandler() {
    setInvalidCredentials(!invalidCredentials);
  }

  return (
    <View style={{ backgroundColor, flex: 1 }}>
      <View
        style={{
          flex: 1,
          marginTop: 100,
          alignItems: "center",
          backgroundColor,
        }}
      >
        <MaterialCommunityIcons
          name={iconName}
          size={162}
          color={"white"}
        ></MaterialCommunityIcons>

        <View style={{ marginTop: 16 }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: "white",
              justifyContent: "center",
            }}
          >
            {title}
          </Text>
        </View>

        <View style={{ flex: 1, display: "flex", width: "90%" }}>
          <InputField
            name={"Email"}
            backgroundColor={"rgba(50, 50, 50, 0.95)"}
            marginTop={30}
            placeholder={"Required"}
          >
            <TextInput
              style={{ color: "white" }}
              placeholder={"Required"}
              value={email}
              onChangeText={emailHandler}
              keyboardType={"default"}
              textAlign="right"
            />
          </InputField>

          <InputField
            name={"Password"}
            backgroundColor={"rgba(50, 50, 50, 0.95)"}
            marginTop={10}
            marginBottom={30}
            placeholder={"Required"}
          >
            <TextInput
              style={{ color: "white" }}
              placeholder={"Required"}
              value={password}
              onChangeText={passwordHandler}
              keyboardType={"default"}
              textAlign="right"
              secureTextEntry={true}
            />
          </InputField>
          <Button
            onPress={signupHandler}
            title={"Sign up"}
            color={"white"}
          ></Button>
        </View>
      </View>
      {children}

      <Modal
        animationType="slide"
        transparent={true}
        visible={invalidCredentials}
        onRequestClose={() => {
          setInvalidCredentials(!invalidCredentials);
        }}
      >
        <View style={styles.modal}>
          <View style={styles.modalView}>
            <Text style={{ color: "red", marginBottom: 20, fontSize: 15 }}>
              user error. it's not our fault 😏
              {"\n\n"}hint: password should be longer than 6 characters and a
              valid email...
            </Text>
            <Button onPress={modalVisibilityHandler} title={"Close"}></Button>
          </View>
        </View>
      </Modal>
    </View>
  );
};

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
