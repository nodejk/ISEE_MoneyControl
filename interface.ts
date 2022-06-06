import { Icon } from "@expo/vector-icons/build/createIconSet";
import { NavigationProp } from "@react-navigation/native";

export interface TransactionDescription {
  date: Date;
  category?: string;
  name: string;
  type: "credit" | "debit";
  paymentAmount: number;
  paymentMethod?: string;
  additionalNote?: string;
  currency: "EURO" | "USD" | "GBP" | "YEN";
  repeatedTransaction: boolean;
  id: any;
}

export interface UserDescriptionInterface {
  income: number;
  thresholdExpense: ThresholdExpenseCategory[];
  firstName?: string;
  lastName?: string;
  loginEmail: string;
  onLogin: (credentials: userCredentials) => void;
  onLogout: () => void;
  loginStatus: boolean;
  userDefinedCategory: string[];
  userDefinedPaymentMethod: string[];
}

export interface userCredentials {
  email: string;
  password: string;
}

export interface ThresholdExpenseCategory {
  category: string;
  thresholdBudget: number;
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
  currency: "EURO" | "USD" | "GBP" | "JPY";
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
  pressable?: () => any;
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

export interface TransactionActions {
  ADD_TRANSACTION: string;
  REMOVE_TRANSACTION: string;
  FILTER_TRANSACTIONS: string;
}

export const actions = {
  ADD_TRANSACTION: "ADD_TRANSACTION",
  REMOVE_TRANSACTION: "REMOVE_TRANSACTION",
  FILTER_TRANSACTIONS_BY_DATE: "FILTER_TRANSACTIONS_BY_DATE",
  FILTER_TRANSACTIONS_BY_CATEGORY: "FILTER_TRANSACTIONS_BY_CATEGORY",
  FILTER_TRANSACTIONS_BY_PAYMENT_METHOD:
    "FILTER_TRANSACTIONS_BY_PAYMENT_METHOD",
};

export interface ActionInterface {
  type:
    | "ADD_TRANSACTION"
    | "REMOVE_TRANSACTION"
    | "FILTER_TRANSACTIONS_BY_DATE"
    | "FILTER_TRANSACTIONS_BY_CATEGORY"
    | "FILTER_TRANSACTIONS_BY_PAYMENT_METHOD"
    | "EDIT_TRANSACTION";
  transaction?: TransactionDescription;
  dateFrom?: Date;
  dateTo?: Date;
  category?: string;
  paymentMethod?: string;
  id?: string;
}

export interface TransactionState {
  userTransactions: TransactionDescription[];
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
