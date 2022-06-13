import React, { useContext, useState } from "react";
import { Text, View } from "../../components/Themed";
import { TransactionContext } from "../../store/TransactionContextProvider";
import { RootTabScreenProps } from "../../types";
import {
  Button,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TextInput,
  useColorScheme,
} from "react-native";
import { InputField } from "./InputField";
import { UserContext } from "../../store/UserContextProvider";

import { FirebaseLoginHandler } from "../../store/FirebaseLoginHandler";

export function SyncAccount(navigation: RootTabScreenProps<any>) {
  const colorScheme = useColorScheme();
  const textColor = colorScheme === "dark" ? "white" : "black";
  // const userCtx = useContext(UserContext);
  const transactionContext = useContext(TransactionContext);
  const cardBackground = colorScheme === "dark" ? "rgb(24, 24, 24)" : "white";
  const keyboardVerticalOffset = 20;
  const cardBorderColor =
    colorScheme === "dark" ? "rgb(40, 40, 40)" : "rgb(220, 220, 220)";
  const borderWidth = 1;
  const borderRadius = 9;
  const userContext = useContext(UserContext);

  const [newUserSignup, setNewUserSignup] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [credentialsValid, setCredentialsValid] = useState(null);

  function emailValidator(email: string) {
    let regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;

    return regEmail.test(email);
  }
  function credentialValidator(email: string, password: string) {
    setCredentialsValid(emailValidator(email) && password.length >= 6);
  }

  function emailHandler(txt: string) {
    // setCredentialsValid(true);
    setEmail(txt);
  }

  function passwordHandler(txt: string) {
    // setCredentialsValid(true);
    setPassword(txt);
  }

  function userNotLoggedIn() {
    function loginSignUpHandler() {
      credentialValidator(email, password);
      if (credentialsValid) {
        // FirebaseLoginHandler(email, password, newUserSignup);

        userContext.onLogin({ email, password });
        setEmail("");
        setPassword("");
      }
    }

    function signInHandler() {
      credentialValidator(email, password);
      if (credentialsValid) {
        // FirebaseLoginHandler(email, password, newUserSignup);

        userContext.onLogin({ email, password });
        setEmail("");
        setPassword("");
      }
    }

    return (
      <React.Fragment>
        {credentialsValid !== null && !credentialsValid && (
          <Text style={{ color: "red", fontSize: 20 }}>
            please enter valid credentials 🤡
          </Text>
        )}
        {newUserSignup && (
          <Text style={{ color: textColor, fontSize: 20, height: 100 }}>
            Please enter email and password to sign up 😁
          </Text>
        )}
        {!newUserSignup && <View style={{ height: 100 }}></View>}
        <InputField
          name={"Email"}
          backgroundColor={cardBackground}
          borderColor={cardBorderColor}
          borderTopWidth={borderWidth}
          borderHorizontalWidth={borderWidth}
          borderTopRadius={borderRadius}
          placeholder={"Required"}
        >
          <TextInput
            style={{ ...styles.inputField, color: textColor }}
            placeholder={"Required"}
            value={email}
            onChangeText={emailHandler}
            keyboardType={"default"}
            textAlign="right"
          />
        </InputField>
        <InputField
          name={"Password"}
          backgroundColor={cardBackground}
          borderColor={cardBorderColor}
          borderTopWidth={borderWidth}
          borderHorizontalWidth={borderWidth}
          borderBottomRadius={borderRadius}
          borderBottomWidth={borderWidth}
          placeholder={"Required"}
        >
          <TextInput
            style={{ ...styles.inputField, color: textColor }}
            placeholder={"Required"}
            value={password}
            onChangeText={passwordHandler}
            keyboardType={"default"}
            textAlign="right"
            secureTextEntry={true}
          />
        </InputField>

        <View
          style={{
            flexDirection: "row",
            display: "flex",
            justifyContent: "space-between",
            paddingHorizontal: 50,
            marginTop: 30,
          }}
        >
          {!newUserSignup && (
            <React.Fragment>
              <Button
                onPress={() => {
                  setNewUserSignup(!newUserSignup);
                }}
                title={"Sign up?"}
              ></Button>
              <Button onPress={signInHandler} title={"Login"}></Button>
            </React.Fragment>
          )}

          {newUserSignup && (
            <React.Fragment>
              <Button
                onPress={() => {
                  setNewUserSignup(!newUserSignup);
                }}
                title={"Cancel"}
              ></Button>
              <Button onPress={loginSignUpHandler} title={"Sign up"}></Button>
            </React.Fragment>
          )}
        </View>
      </React.Fragment>
    );
  }

  function userLoggedIn() {
    return (
      <View
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 50,
          marginTop: 30,
        }}
      >
        <Text style={{ color: textColor, fontSize: 20, marginBottom: 20 }}>
          Outta Sync?
        </Text>

        <Button
          onPress={() => {
            console.log("here");
          }}
          title={"Sync Now!"}
        ></Button>
        <View style={{ marginBottom: 20 }}></View>
        <Button
          onPress={() => {
            userContext.onLogout();
          }}
          title={"Log Out"}
        ></Button>
      </View>
    );
  }
  const loginStatus = userContext.loginStatus;
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={keyboardVerticalOffset}
        style={styles.container}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
          }}
        >
          <Text
            style={{
              fontSize: 40,
              fontWeight: "bold",
              color: textColor,
              marginBottom: 50,
            }}
          >
            Sync Account
          </Text>
          {!loginStatus && userNotLoggedIn()}
          {loginStatus && userLoggedIn()}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "center",
    paddingLeft: 20,
    paddingRight: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  profilePicture: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 35,
    marginBottom: 20,
    paddingBottom: 40,
  },

  editIcon: {
    // position: "absolute",
    // right: 0,
    // bottom: 0,

    alignItems: "flex-start",
    // alignSelf: "flex-start",
  },
  inputField: {
    flex: 1,
    fontSize: 15,
  },
});
