import {
  ActionInterface,
  TransactionDescription,
  TransactionState,
} from "../interface";

export const actions = {
  ADD_TRANSACTION: "ADD_TRANSACTION",
  REMOVE_TRANSACTION: "REMOVE_TRANSACTION",
  FILTER_TRANSACTIONS_BY_DATE: "FILTER_TRANSACTIONS_BY_DATE",
  FILTER_TRANSACTIONS_BY_CATEGORY: "FILTER_TRANSACTIONS_BY_CATEGORY",
  FILTER_TRANSACTIONS_BY_PAYMENT_METHOD:
    "FILTER_TRANSACTIONS_BY_PAYMENT_METHOD",
  EDIT_TRANSACTION: "EDIT_TRANSACTION",
};

export const reducer = (
  state: TransactionState,
  actionGiven: ActionInterface
): TransactionState => {
  switch (actionGiven.type) {
    case actions.ADD_TRANSACTION:
      return {
        userTransactions: [
          ...state.userTransactions,
          {
            date: actionGiven.transaction!.date,
            category: actionGiven.transaction!.category,
            name: actionGiven.transaction!.name,
            type: actionGiven.transaction!.type,
            paymentAmount: actionGiven.transaction!.paymentAmount,
            paymentMethod: actionGiven.transaction!.paymentMethod,
            additionalNote: actionGiven.transaction!.additionalNote,
            currency: actionGiven.transaction!.currency,
            repeatedTransaction: actionGiven.transaction!.repeatedTransaction,
            id: actionGiven.transaction!.id,
          },
        ],
      };
    case actions.REMOVE_TRANSACTION: {
      const filteredTransactions = state.userTransactions.filter(
        (transaction) => transaction.id !== actionGiven.transaction!.id
      );
      return { userTransactions: filteredTransactions };
    }
    case actions.FILTER_TRANSACTIONS_BY_DATE: {
      let filteredTransactions: TransactionDescription[] = [];

      if (actionGiven.dateFrom !== undefined) {
        filteredTransactions = state.userTransactions.filter(
          (transaction) => transaction.date >= actionGiven.dateFrom!
        );
      }

      if (actionGiven.dateFrom !== undefined) {
        filteredTransactions = [
          ...filteredTransactions,
          ...state.userTransactions.filter(
            (transaction) => transaction.date <= actionGiven.dateTo!
          ),
        ];
      }

      return { userTransactions: filteredTransactions };
    }

    case actions.FILTER_TRANSACTIONS_BY_CATEGORY: {
      const filteredTransactions = state.userTransactions.filter(
        (transaction) =>
          transaction.category !== actionGiven.transaction!.category
      );
      return { userTransactions: filteredTransactions };
    }

    case actions.FILTER_TRANSACTIONS_BY_PAYMENT_METHOD: {
      const filteredTransactions = state.userTransactions.filter(
        (transaction) =>
          transaction.paymentMethod !== actionGiven.transaction!.paymentMethod
      );
      return { userTransactions: filteredTransactions };
    }

    case actions.EDIT_TRANSACTION: {
      // console.log("here");
      const objIndex = state.userTransactions.findIndex(
        (transaction) => transaction.id === actionGiven.transaction!.id
      );
      console.log(objIndex);
      // console.log(actionGiven.transaction);
      const edittedTransaction: TransactionDescription = {
        date: actionGiven.transaction!.date,
        category: actionGiven.transaction!.category,
        name: actionGiven.transaction!.name,
        type: actionGiven.transaction!.type,
        paymentAmount: actionGiven.transaction!.paymentAmount,
        paymentMethod: actionGiven.transaction!.paymentMethod,
        additionalNote: actionGiven.transaction!.additionalNote,
        currency: actionGiven.transaction!.currency,
        repeatedTransaction: actionGiven.transaction!.repeatedTransaction,
        id: actionGiven.transaction!.id,
      };

      state.userTransactions[objIndex] = edittedTransaction;

      // const newArr = state.userTransactions.map((element) => {
      //   if (element.id === actionGiven.transaction!.id) {
      //     return { ...element, ...actionGiven.transaction };
      //   }

      //   return element;
      // });

      // console.log(state.userTransactions);
      // let arr = state.userTransactions.forEach((item, i) => {
      //   item.id === actionGiven.transaction?.id
      //     ? { ...actionGiven.transaction }
      //     : item;
      // });
      return {
        userTransactions: state.userTransactions,
      };
    }
    default:
      return state;
  }
};
