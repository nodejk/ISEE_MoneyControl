import React, { useReducer } from "react";
import { currency, TransactionDescription } from "../interface";
import { actions, reducer } from "./action_reducers";

interface UserTransactionInterface {
  userTransactions: TransactionDescription[];
  addTransaction: (transaction: TransactionDescription) => any | void;
  removeTransaction: (id: string) => any | void;
  editTransaction: (transaction: TransactionDescription) => any | void;
}

import Moment from "moment";

Moment.locale();

const initialUserTransactionState: UserTransactionInterface = {
  userTransactions: [
    {
      date: new Date("2022-05-10"),
      name: "Rent 🏡",
      type: { id: "1", name: "Debit 😢", type: "debit" },
      category: {
        id: "1",
        name: "Rent",
        categoryBudgetSet: false,
        categoryBudgetLimit: 0,
      },
      paymentMethod: { id: "1", name: "card" },
      paymentAmount: 500,
      currency: { id: "2", name: "EURO", conversionRateToEuro: 1, label: "€" },
      repeatedTransaction: false,
      additionalNote: "Move to a New Place",
      id: "123",
    },
    {
      date: new Date("2022-06-03"),
      name: "Groceries 🛒",
      type: { id: "1", name: "Debit 😢", type: "debit", categoryBudget: 0 },
      category: {
        id: "2",
        name: "Groceries",
        categoryBudgetSet: false,
        categoryBudgetLimit: 0,
      },
      paymentAmount: 100,
      paymentMethod: { id: "1", name: "card" },
      currency: { id: "1", name: "EURO", conversionRateToEuro: 1, label: "€" },
      repeatedTransaction: false,
      id: "3432",
    },
    {
      date: new Date("2022-06-01"),
      name: "Salary 💵",
      type: { id: "2", name: "Credit 🤑", type: "credit" },
      category: {
        id: "3",
        name: "Salary",
        categoryBudget: 0,
        categoryBudgetSet: false,
        categoryBudgetLimit: 0,
      },
      paymentMethod: { id: "1", name: "card" },
      currency: { id: "2", name: "EURO", conversionRateToEuro: 1, label: "€" },
      paymentAmount: 3000,
      repeatedTransaction: false,
      additionalNote: "make more money",
      id: "4543",
    },
    {
      date: new Date("2022-03-01"),
      name: "Beer",
      type: { id: "1", name: "Debit 😢", type: "debit" },
      category: {
        id: "4",
        name: "Eat Out",
        categoryBudget: 0,
        categoryBudgetSet: false,
        categoryBudgetLimit: 0,
      },
      paymentMethod: { id: "1", name: "card" },
      currency: { id: "2", name: "EURO", conversionRateToEuro: 1, label: "€" },
      paymentAmount: 49,
      repeatedTransaction: false,
      additionalNote: "make more money",
      id: "256644",
    },

    {
      date: new Date("2022-05-16"),
      name: "McDonalds 🍔",
      type: { id: "1", name: "Debit 😢", type: "debit" },
      category: {
        id: "4",
        name: "Eat Out",
        categoryBudget: 0,
        categoryBudgetSet: false,
        categoryBudgetLimit: 0,
      },
      paymentMethod: { id: "1", name: "card" },
      currency: { id: "2", name: "EURO", conversionRateToEuro: 1, label: "€" },
      paymentAmount: 78,
      repeatedTransaction: false,
      additionalNote: "make more money",
      id: "342665",
    },
  ] as unknown as TransactionDescription[],
  addTransaction: (transaction: TransactionDescription) => {
    null;
  },
  removeTransaction: (id: string) => {},
  editTransaction: (transaction: TransactionDescription) => {},
};

export const TransactionContext = React.createContext<UserTransactionInterface>(
  initialUserTransactionState
);
// to do: add alert message
// onPress={() => {
//   Alert.alert("Bubble pressed");
// }}
export const TransactionContextProvider: React.FC<{}> = (props) => {
  const [state, dispatch] = useReducer(reducer, initialUserTransactionState);

  const contextVal = {
    userTransactions: state.userTransactions,

    addTransaction: (transaction: TransactionDescription) => {
      dispatch({ type: actions.ADD_TRANSACTION, transaction: transaction });
    },
    removeTransaction: (id: string) => {
      dispatch({ type: actions.REMOVE_TRANSACTION, id: id });
    },
    editTransaction: (transaction: TransactionDescription) => {
      dispatch({
        type: actions.EDIT_TRANSACTION,
        transaction: transaction,
      });
    },
  };

  return (
    <TransactionContext.Provider value={contextVal}>
      {props.children}
    </TransactionContext.Provider>
  );
};
