import React, { useState } from "react";
import SwitchSelector from "react-native-switch-selector";

import {
  ScrollView,
  StyleSheet,
  TextInput,
  StatusBar,
  DatePickerIOSBase,
  Button,
} from "react-native";

import { Text, View } from "../../components/Themed";
import { RootTabScreenProps } from "../../types";
import useColorScheme from "../../hooks/useColorScheme";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import DateTimePicker from "react-native-modal-datetime-picker";

const options = [
  { label: "-", value: "1" },
  { label: "+", value: "2" },
];
export function FilterModal(props: RootTabScreenProps<any>) {
  const colorScheme = useColorScheme();
  const borderWidth = 1;

  const cardBackground = colorScheme === "dark" ? "rgb(24, 24, 24)" : "white";
  const cardBorderColor =
    colorScheme === "dark" ? "rgb(40, 40, 40)" : "rgb(220, 220, 220)";

  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  return (
    <View style={{ ...styles.container }}>
      <ScrollView>
        <Text>sdfd</Text>

        <Button title="Open" onPress={() => setOpen(true)} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: StatusBar.currentHeight! + 100,
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
});