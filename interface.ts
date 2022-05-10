import { Icon } from "@expo/vector-icons/build/createIconSet";
import { NavigationProp } from "@react-navigation/native";

export interface TransactionDescription {
  date: string;
  category: string;
  name: string;
  type: "credit" | "debit";
  paymentAmount: number;
  paymentMethod?: string;
  additionalNote?: string;
  currency: "EURO" | "USD" | "GBP" | "YEN";
  repeatedTransaction?: boolean;
  id: number;
  navigation?: NavigationProp<any, any>;
  navigationScreen?: string;
}

export interface userDescription {
  income?: number;
  thresholdExpense?: number;
  profilePicture?: number;
  firstName?: string;
  lastName?: string;
  repeatedUserTransactions?: String[];
}

export interface ProfileNaivgationProps {
  cardName: string;
  topGap?: number;
  bottomGap?: number;
  topBorder?: number;
  bottomBorder?: number;
  children?: React.ReactNode[];
  navigation?: NavigationProp<any, any>;
  navigationScreen?: string;
  fontSize?: number;
}

export interface ProfileSettingInputFieldProps {
  topGap?: number;
  bottomGap?: number;
  borderRadiusTop?: number;
  borderRadiusBottom?: number;
  value?: string;
  topBorder?: number;
  bottomBorder?: number;
  placeholder?: string;
  children?: React.ReactNode;
}

export interface InputFieldProps {
  name: string;
  borderTopWidth?: number;
  borderBottomWidth?: number;
  borderHorizontalWidth?: number;
  borderColor?: string;
  marginTop?: number;
  marginBottom?: number;
  borderTopRadius?: number;
  borderBottomRadius?: number;
  backgroundColor?: string;
  children?: React.ReactNode;
  paddingRight?: number;
  placeholder?: string;
}

export interface HeaderButtonProps {
  color: string;
  name: string;
  size: number;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  onPress?: (navigateScreen?: string, props?: any) => void;
}
// type transactionType = {"credit" | "debit"}
// export interface TransactionCardProps {
//   amount: number;
//   type: "credit" | "debit";
//   name: string;
//   id: string;
//   navigation?: NavigationProp<any, any>;
//   navigationScreen?: string;
// }
