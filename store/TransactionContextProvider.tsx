import React, { useReducer } from "react";
import { TransactionDescription } from "../interface";
import { actions, reducer } from "./action_reducers";

interface UserTransactionInterface {
  userTransactions: TransactionDescription[];
  addTransaction: (transaction: TransactionDescription) => any | void;
  removeTransaction: (transaction: TransactionDescription) => any | void;
  filterTransactionByDate: (dateFrom: Date, dateTo: Date) => any | void;
  filterTransactionByCategory: (category: string) => any | void;
  filterTransactionByPaymentMethod: (paymentMethod: string) => any | void;
  editTransaction: (transaction: TransactionDescription) => any | void;
}

const initialUserTransactionState: UserTransactionInterface = {
  userTransactions: [],
  addTransaction: (transaction: TransactionDescription) => {
    null;
  },
  removeTransaction: (transaction: TransactionDescription) => {},
  filterTransactionByDate: (dateFrom: Date, dateTo: Date) => {},
  filterTransactionByCategory: function (category: string) {},
  filterTransactionByPaymentMethod: function (paymentMethod: string) {},
  editTransaction: function (transaction: TransactionDescription): void {},
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

    removeTransaction: (transaction: TransactionDescription) => {
      dispatch({ type: actions.REMOVE_TRANSACTION, transaction: transaction });
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
