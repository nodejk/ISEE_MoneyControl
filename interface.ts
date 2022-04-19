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
  income: number;
  cycle: "monthly" | "weekly" | "daily";
  threshold?: number;
}

const userDes: userDescription = {
  income: 123,
  cycle: "monthly",
};
