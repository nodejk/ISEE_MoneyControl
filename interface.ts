import { Icon } from "@expo/vector-icons/build/createIconSet";
import { NavigationProp } from "@react-navigation/native";

export interface itemDescription {
  date: string;
  category: string;
  paymentAmount: number;
  paymentMethod: string;
  additionalNote?: string;
  currency: "EURO" | "USD" | "GBP" | "YEN";
  repeatedTransaction?: boolean;
  id: number;
  name: string;
}

export interface userDescription {
  income?: number;
  thresholdExpense?: number;
  profilePicture?: number;
  firstName?: string;
  lastName?: string;
  repeatedUserTransactions?: String[];
}

export interface profileLayoutCardProps {
  cardName: string;
  topGap?: number;
  bottomGap?: number;
  topBorder?: number;
  bottomBorder?: number;
  children?: React.ReactNode;
  navigation?: NavigationProp<any, any>;
}

// export interface RouterProps {
//   navigation: NavigationProp<any, any>;
// }
