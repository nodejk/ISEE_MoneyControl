import React, { useState } from "react";
import {
  UserDescriptionInterface,
  userCredentials,
  category,
  paymentMethod,
  currency,
  userTransactionType,
  ThresholdExpenseCategory,
} from "../interface";

const defaultCategories: category[] = [
  { id: "1", name: "Rent", categoryBudgetLimit: 0, categoryBudgetSet: false },
  {
    id: "2",
    name: "Groceries",
    categoryBudgetLimit: 0,
    categoryBudgetSet: false,
  },
  { id: "3", name: "Salary", categoryBudgetLimit: 0, categoryBudgetSet: false },
  {
    id: "4",
    name: "Eat Out",
    categoryBudgetLimit: 0,
    categoryBudgetSet: false,
  },
];

const defaultPaymentMethod: paymentMethod[] = [
  { id: "1", name: "card" },
  { id: "2", name: "cash" },
];

const defaultCurrencies: currency[] = [
  { id: "1", name: "USD", conversionRateToEuro: 1, label: "$" },
  { id: "2", name: "EURO", conversionRateToEuro: 1, label: "€" },
  { id: "3", name: "GBP", conversionRateToEuro: 1.2, label: "£" },
  { id: "4", name: "JPY", conversionRateToEuro: 0.01, label: "¥" },
];

const defaultUserTransactionType: userTransactionType[] = [
  { id: "1", name: "Debit 😢", type: "debit" },
  { id: "2", name: "Credit 🤑", type: "credit" },
];
export const UserContext = React.createContext<UserDescriptionInterface>({
  income: 0,
  thresholdExpense: [],
  firstName: "",
  lastName: "",
  loginEmail: "",
  firstNameHandler: () => {},
  lastNameHandler: () => {},
  onLogin: (credentials: userCredentials) => {},
  onLogout: () => {},
  userId: "",
  loginStatus: false,
  userDefinedCategory: defaultCategories,
  editUserDefinedCategories: (action: string, category: category) => {},
  userDefinedPaymentMethod: defaultPaymentMethod,
  editUserDefinedPaymentMethod: (
    action: string,
    paymentMethod: paymentMethod
  ) => {},
  userDefinedCurrencies: defaultCurrencies,
  editUserDefinedCurrencies: (action: string, currency: currency) => {},
  userDefinedTransactionType: defaultUserTransactionType,
  budgetCategories: [] as ThresholdExpenseCategory[],
  handleBudgetCategories: (
    action: string,
    categoryId: string,
    threshold?: string
  ) => {},
});

export const UserContextProvider: React.FC<{}> = (props) => {
  const [userDefinedCategories, setUserDefinedCategories] =
    useState(defaultCategories);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [userDefinedPaymentMethod, setUserDefinedPaymentMethod] =
    useState(defaultPaymentMethod);

  const [userId, setUserId] = useState("");

  const [userDefinedBudgets, setUserDefinedBudgets] = useState(
    [] as ThresholdExpenseCategory[]
  );

  const [loginStatus, setLoginStatus] = useState(false);

  function userDefinedCategoryEditor(action: string, categoryToEdit: category) {
    console.log("categoryToEdit-->", categoryToEdit);
    if (action === "delete") {
      setUserDefinedCategories(
        userDefinedCategories.filter(function (category) {
          return category.id != categoryToEdit.id;
        })
      );
    }

    if (action === "edit") {
      const objIndex = userDefinedCategories.findIndex(
        (category) => category.id === categoryToEdit.id
      );

      const newCategoryState = userDefinedCategories.map((category) => {
        if (category.id === categoryToEdit.id) {
          return {
            ...category,
            name: categoryToEdit.name,
            categoryBudgetSet: categoryToEdit.categoryBudgetSet,
            categoryBudgetLimit: categoryToEdit.categoryBudgetLimit,
          };
        }

        return category;
      });

      setUserDefinedCategories(newCategoryState);
    }

    if (action === "add") {
      setUserDefinedCategories([...userDefinedCategories, categoryToEdit]);
    }
  }

  function userDefinedPaymentMethodEditor(
    action: string,
    paymentMethodToEdit: paymentMethod
  ) {
    if (action === "delete") {
      setUserDefinedPaymentMethod(
        userDefinedPaymentMethod.filter(function (paymentMethod) {
          return paymentMethod.id != paymentMethodToEdit.id;
        })
      );
    }

    if (action === "edit") {
      const objIndex = userDefinedPaymentMethod.findIndex(
        (paymentMethod) => paymentMethod.id === paymentMethodToEdit.id
      );

      const newPaymentMethodState = userDefinedPaymentMethod.map(
        (paymentMethod) => {
          if (paymentMethod.id === paymentMethodToEdit.id) {
            return { ...paymentMethod, name: paymentMethodToEdit.name };
          }

          return paymentMethod;
        }
      );

      setUserDefinedPaymentMethod(newPaymentMethodState);
    }

    if (action === "add") {
      setUserDefinedPaymentMethod([
        ...userDefinedPaymentMethod,
        paymentMethodToEdit,
      ]);
    }
  }

  function userDefinedCurrencyEditor(
    action: string,
    currencyToEdit: currency
  ) {}

  function handleBudgetCategories(
    action: string,
    categoryId: string,
    threshold?: string
  ) {
    if (action === "add") {
      const categoryThreshold: ThresholdExpenseCategory = {
        categoryId: categoryId,
        thresholdBudget: parseInt(threshold!),
      };

      setUserDefinedBudgets([...userDefinedBudgets, categoryThreshold]);
    }

    if (action === "edit") {
      const objIndex = userDefinedBudgets.findIndex(
        (categoryThreshold) => categoryThreshold.categoryId === categoryId
      );

      const newcategoryThresholdState = userDefinedBudgets.map(
        (categoryThreshold) => {
          if (categoryThreshold.categoryId === categoryId) {
            return {
              ...categoryThreshold,
              thresholdExpense: parseInt(threshold!),
            };
          }

          return categoryThreshold;
        }
      );

      setUserDefinedBudgets(newcategoryThresholdState);
    }

    if (action === "delete") {
      setUserDefinedBudgets(
        userDefinedBudgets.filter(function (categoryThreshold) {
          return categoryThreshold.categoryId != categoryId;
        })
      );
    }
  }

  function loginHandler(credentials: userCredentials) {
    setLoginStatus(true);
  }

  function logoutHandler() {
    setLoginStatus(false);
  }
  const defualtUserState = {
    income: 0,
    thresholdExpense: [],
    firstName: firstName,
    lastName: lastName,
    firstNameHandler: setFirstName,
    lastNameHandler: setLastName,
    loginEmail: "",
    onLogin: loginHandler,
    onLogout: logoutHandler,
    userId: userId,
    loginStatus: loginStatus,
    userDefinedCategory: userDefinedCategories,
    editUserDefinedCategories: userDefinedCategoryEditor,
    userDefinedPaymentMethod: userDefinedPaymentMethod,
    editUserDefinedPaymentMethod: userDefinedPaymentMethodEditor,
    userDefinedCurrencies: defaultCurrencies,
    editUserDefinedCurrencies: userDefinedCurrencyEditor,
    userDefinedTransactionType: defaultUserTransactionType,
    budgetCategories: userDefinedBudgets,
    handleBudgetCategories: handleBudgetCategories,
  };

  return (
    <UserContext.Provider value={defualtUserState}>
      {props.children}
    </UserContext.Provider>
  );
};
