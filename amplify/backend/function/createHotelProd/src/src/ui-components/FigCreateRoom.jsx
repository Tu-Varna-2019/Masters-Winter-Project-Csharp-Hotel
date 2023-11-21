/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { getOverrideProps } from "./utils";
import {
  Button,
  SelectField,
  StepperField,
  Text,
  TextField,
  View,
} from "@aws-amplify/ui-react";
export default function FigCreateRoom(props) {
  const { overrides, ...rest } = props;
  return (
    <View
      width="1920px"
      height="895px"
      display="block"
      gap="unset"
      alignItems="unset"
      justifyContent="unset"
      overflow="hidden"
      position="relative"
      padding="0px 0px 0px 0px"
      backgroundColor="rgba(255,255,255,1)"
      {...getOverrideProps(overrides, "FigCreateRoom")}
      {...rest}
    >
      <View
        width="1920px"
        height="895px"
        display="block"
        gap="unset"
        alignItems="unset"
        justifyContent="unset"
        position="absolute"
        top="0px"
        left="0px"
        padding="0px 0px 0px 0px"
        backgroundColor="rgba(56,59,64,1)"
        {...getOverrideProps(overrides, "rectangle_child_grey")}
      ></View>
      <Text
        fontFamily="Hind Mysuru"
        fontSize="48px"
        fontWeight="400"
        color="rgba(255,255,255,1)"
        lineHeight="24px"
        textAlign="center"
        display="block"
        direction="column"
        justifyContent="unset"
        width="349px"
        height="unset"
        gap="unset"
        alignItems="unset"
        position="absolute"
        top="100px"
        left="calc(50% - 174.5px - 6.5px)"
        padding="0px 0px 0px 0px"
        whiteSpace="pre-wrap"
        children="Room"
        {...getOverrideProps(overrides, "Room")}
      ></Text>
      <View
        width="729px"
        height="819px"
        display="block"
        gap="unset"
        alignItems="unset"
        justifyContent="unset"
        position="absolute"
        top="25px"
        left="579px"
        border="3px SOLID rgba(255,255,255,1)"
        borderRadius="219px"
        padding="0px 0px 0px 0px"
        {...getOverrideProps(overrides, "Rectangle 1")}
      ></View>
      <Button
        width="142px"
        height="63px"
        position="absolute"
        top="742px"
        left="960px"
        size="default"
        isDisabled={false}
        variation="primary"
        children="Submit"
        {...getOverrideProps(overrides, "button_submit")}
      ></Button>
      <Button
        width="142px"
        height="63px"
        position="absolute"
        top="742px"
        left="779px"
        backgroundColor="rgba(92,102,112,1)"
        size="default"
        isDisabled={false}
        variation="primary"
        children="Cancel"
        {...getOverrideProps(overrides, "button_cancel")}
      ></Button>
      <SelectField
        width="323px"
        height="unset"
        label="Registration"
        placeholder=" "
        position="absolute"
        top="501px"
        left="792px"
        boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
        size="default"
        isDisabled={false}
        labelHidden={false}
        variation="default"
        {...getOverrideProps(overrides, "select_field_registration")}
      ></SelectField>
      <SelectField
        width="323px"
        height="unset"
        label="Category"
        placeholder=" "
        position="absolute"
        top="174px"
        left="794px"
        boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
        size="default"
        isDisabled={false}
        labelHidden={false}
        variation="default"
        {...getOverrideProps(overrides, "selectfield_category")}
      ></SelectField>
      <StepperField
        width="unset"
        height="unset"
        label="Floor"
        position="absolute"
        top="283px"
        left="799px"
        size="default"
        isDisabled={false}
        labelHidden={false}
        variation="default"
        {...getOverrideProps(overrides, "stepperfield_floor")}
      ></StepperField>
      <StepperField
        width="unset"
        height="unset"
        label="Beds"
        position="absolute"
        top="386px"
        left="802px"
        size="default"
        isDisabled={false}
        labelHidden={false}
        variation="default"
        {...getOverrideProps(overrides, "stepperfield_beds")}
      ></StepperField>
      <TextField
        width="300px"
        height="unset"
        label="Price"
        placeholder="Add"
        position="absolute"
        top="610px"
        left="794px"
        size="default"
        isDisabled={false}
        labelHidden={false}
        variation="default"
        {...getOverrideProps(overrides, "textfield_price")}
      ></TextField>
    </View>
  );
}