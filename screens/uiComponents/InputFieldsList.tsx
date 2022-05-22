import React, { useEffect, useImperativeHandle, useState } from "react";
import { TextInput, useColorScheme, View } from "react-native";
import { InputField } from "./InputField";
import { ScrollView, StyleSheet, StatusBar } from "react-native";

interface propsInterface {
  fieldList: {
    valueType: string;
    value: any;
    name: string;
    requiredField: boolean;
    fieldName: string;
    inputDescription?: string;
    onChangeHandler: (text: string) => void;
  }[];
}

export const InputFieldsList = React.forwardRef<any, propsInterface>(
  (props, ref) => {
    const colorScheme = useColorScheme();

    const borderWidth = 1;
    const borderRadius = 9;

    const cardBackground = colorScheme === "dark" ? "rgb(24, 24, 24)" : "white";
    const cardBorderColor =
      colorScheme === "dark" ? "rgb(40, 40, 40)" : "rgb(220, 220, 220)";
    const margins = { marginTop: 18 };

    let outputVal = props.fieldList.reduce((acc, element) => {
      const { name, value } = element;
      return { ...acc, [name]: value };
    }, {});

    function FieldListItem(props: {
      name: string;
      valueType: string;
      value: any;
      positionType: string;
      requiredField: boolean;
      fieldName: string;
      inputDescription?: string;
      onChangeHandler: (text: string) => void;
    }) {
      // };
      const [text, setText] = useState(props.value);
      return (
        <View>
          {props.inputDescription === undefined ? (
            <InputField
              name={props.fieldName}
              backgroundColor={cardBackground}
              borderColor={cardBorderColor}
              borderTopWidth={borderWidth}
              borderBottomWidth={
                props.positionType === "bottom" ? borderWidth : 0
              }
              borderHorizontalWidth={borderWidth}
              borderTopRadius={props.positionType === "top" ? borderRadius : 0}
              borderBottomRadius={
                props.positionType === "bottom" ? borderRadius : 0
              }
            >
              <TextInput
                style={styles.inputField}
                placeholder={props.requiredField ? "Required" : "Optional"}
                value={text}
                keyboardType={
                  props.valueType === "number" ? "number-pad" : "default"
                }
                onChangeText={(txt) => {
                  setText(txt);
                }}
                onEndEditing={() => {
                  props.onChangeHandler(text);
                }}
              />
            </InputField>
          ) : null}
        </View>
      );
    }
    return (
      <React.Fragment>
        {props.fieldList.map((element, index) => {
          return (
            <FieldListItem
              {...{
                name: element.name,
                value: element.value,
                valueType: element.valueType,
                positionType:
                  index === 0
                    ? "top"
                    : index === props.fieldList.length - 1
                    ? "bottom"
                    : "",
                requiredField: element.requiredField,
                fieldName: element.fieldName,
                id: index + "asdf",
                onChangeHandler: element.onChangeHandler,
              }}
            ></FieldListItem>
          );
        })}

        {/* <FieldListItem
          // key={1}
          name={props.fieldList[0].name}
          valueType={props.fieldList[0].valueType}
          value={props.fieldList[0].value}
          positionType={"top"}
          requiredField={false}
          fieldName={props.fieldList[0].fieldName}
          onChangeHandler={props.fieldList[0].onChangeHandler}
        ></FieldListItem> */}
      </React.Fragment>
    );
  }
);

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
});
