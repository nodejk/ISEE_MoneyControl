import { Icon } from "@expo/vector-icons/build/createIconSet";
import { NavigationProp } from "@react-navigation/native";

export interface TransactionDescription {
  date: Date;
  category: category;
  name: string;
  type: userTransactionType;
  paymentAmount: number;
  paymentMethod?: paymentMethod;
  additionalNote?: string;
  currency: currency;
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
  userDefinedCategory: category[];
  editUserDefinedCategories: (action: string, category: category) => void;
  editUserDefinedPaymentMethod: (
    action: string,
    paymentMethod: paymentMethod
  ) => void;
  userId: string;
  editUserDefinedCurrencies: (action: string, currency: currency) => void;
  userDefinedPaymentMethod: paymentMethod[];
  userDefinedCurrencies: currency[];
  userDefinedTransactionType: userTransactionType[];
  budgetCategories: ThresholdExpenseCategory[];
  handleBudgetCategories: (
    action: string,
    categoryId: string,
    threshold?: string
  ) => void;
}

export interface userCredentials {
  email: string;
  password: string;
}

export interface userTransactionType {
  id: string;
  name: string;
  type: "debit" | "credit";
}

export interface ThresholdExpenseCategory {
  categoryId: string;
  thresholdBudget: number;
}

export interface category {
  id: string;
  name: string;
  categoryBudgetSet: boolean;
  categoryBudgetLimit: number;
}

export interface currency {
  id: string;
  name: string;
  conversionRateToEuro: number;
  label: string;
}

export interface paymentMethod {
  id: string;
  name: string;
}

export interface ProfileNaivgationProps {
  cardName: string;
  topGap?: number;
  bottomGap?: number;
  topBorder?: number;
  bottomBorder?: number;
  children?: React.ReactNode[];
  navigation?: any;
  navigationScreen?: string;
  fontSize?: number;
  topBorderRadius?: number;
  bottomBorderRadius?: number;
  routeParams?: any;
  currency?: currency;
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
