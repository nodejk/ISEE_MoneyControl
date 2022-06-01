import React, { useReducer } from "react";
import { TransactionDescription } from "../interface";
import { actions, reducer } from "./action_reducers";

interface UserTransactionInterface {
  userTransactions: TransactionDescription[];
  addTransaction: (transaction: TransactionDescription) => any | void;
  removeTransaction: (id: string) => any | void;
  filterTransactionByDate: (dateFrom: Date, dateTo: Date) => any | void;
  filterTransactionByCategory: (category: string) => any | void;
  filterTransactionByPaymentMethod: (paymentMethod: string) => any | void;
  editTransaction: (transaction: TransactionDescription) => any | void;
}

const initialUserTransactionState: UserTransactionInterface = {
  userTransactions: [
    {
      date: new Date(),
      name: "Rent",
      type: "debit",
      paymentMethod: "online",
      paymentAmount: 500,
      currency: "EURO",
      repeatedTransaction: false,
      additionalNote: "Move to a New Place",
      id: "123",
    },
    {
      date: new Date(),
      name: "Groceries",
      type: "debit",
      paymentAmount: "100",
      paymentMethod: "online",
      currency: "EURO",
      repeatedTransaction: false,
      id: "3432",
    },
    {
      date: new Date(),
      name: "Salary",
      type: "credit",
      paymentMethod: "online",
      currency: "EURO",
      paymentAmount: "3000",
      repeatedTransaction: false,
      additionalNote: "make more money",
      id: "4543",
    },
  ] as TransactionDescription[],
  addTransaction: (transaction: TransactionDescription) => {
    null;
  },
  removeTransaction: (id: string) => {},
  filterTransactionByDate: (dateFrom: Date, dateTo: Date) => {},
  filterTransactionByCategory: (category: string) => {},
  filterTransactionByPaymentMethod: (paymentMethod: string) => {},
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

    filterTransactionByDate: (dateFrom: Date, dateTo: Date) => {
      dispatch({
        type: actions.FILTER_TRANSACTIONS_BY_DATE,
        dateFrom: dateFrom,
        dateTo: dateTo,
      });
    },

    filterTransactionByPaymentMethod: (paymentMethod: string) => {
      dispatch({
        type: actions.FILTER_TRANSACTIONS_BY_DATE,
        paymentMethod: paymentMethod,
      });
    },

    filterTransactionByCategory: (category: string) => {
      dispatch({
        type: actions.FILTER_TRANSACTIONS_BY_DATE,
        category: category,
      });
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
