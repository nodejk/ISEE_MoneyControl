import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import * as React from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import { Picker } from "@react-native-picker/picker";

interface ModalProps {
  title: string;
  onUpdate?: () => void;
  modalVisibility: boolean;
  modalVisiblityHandler: () => void;
  setValue: (text: string) => void;
  selectedValue: string;
}
import useColorScheme from "../../hooks/useColorScheme";

export const PopupModal: React.FC<ModalProps> = (props: ModalProps) => {
  const colorScheme = useColorScheme();
  //   const showModal = () => setVisible(true);
  //   const hideModal = () => setVisible(false);
  const cardBackground = colorScheme === "dark" ? "rgb(24, 24, 24)" : "white";
  const textColor = colorScheme === "dark" ? "white" : "black";
  const containerStyle = { backgroundColor: "white", padding: 20 };

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={props.modalVisibility}
      onRequestClose={props.modalVisiblityHandler}
    >
      <View style={styles.centeredView}>
        <View style={{ backgroundColor: cardBackground, ...styles.modalView }}>
          <Text style={{ color: textColor, ...styles.modalText }}>
            {props.title}
          </Text>
          <Picker
            selectedValue={props.selectedValue}
            onValueChange={(itemValue, itemIndex) => props.setValue(itemValue)}
          >
            <Picker.Item label="Java" value="java" />
            <Picker.Item label="JavaScript" value="js" />
          </Picker>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              display: "flex",
            }}
          >
            <Pressable
              style={{ alignItems: "center", paddingHorizontal: 20 }}
              onPress={props.modalVisiblityHandler}
            >
              <MaterialCommunityIcons
                size={35}
                name={"close"}
                style={{ marginBottom: -3 }}
                color={"red"}
              />
            </Pressable>

            <Pressable
              style={{ alignItems: "center", paddingHorizontal: 20 }}
              onPress={props.modalVisiblityHandler}
            >
              <MaterialCommunityIcons
                size={35}
                name={"check"}
                style={{ marginBottom: -3 }}
                color={"green"}
              />
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 10,
    borderRadius: 20,
    paddingHorizontal: 50,
    paddingVertical: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
    width: "40%",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
