import { StyleSheet } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { itemDescription } from "../interface";

const dummy: itemDescription[] = [
  {
    date: "2342",
    category: "asdf",
    paymentAmount: 123,
    paymentMethod: "asfs",
    currency: "EURO",
    id: 1,
    name: "dsaf",
  },
  {
    date: "2342",
    category: "asdfjlla;blw",
    paymentAmount: 123,
    paymentMethod: "asfs",
    currency: "EURO",
    id: 1,
    name: "dsaf",
  },
  {
    date: "2342",
    category: "asdf",
    paymentAmount: 123,
    paymentMethod: "asfs",
    currency: "EURO",
    id: 1,
    name: "dsaf",
  },
  {
    date: "2342",
    category: "asdf",
    paymentAmount: 123,
    paymentMethod: "asfs",
    currency: "EURO",
    id: 1,
    name: "dsaf",
  },
  {
    date: "2342",
    category: "asdf",
    paymentAmount: 123,
    paymentMethod: "asfs",
    currency: "EURO",
    id: 1,
    name: "dsaf",
  },
];

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
});
