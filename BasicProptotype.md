# MoneyIO - Basic Prototype 🤑💸


## Goals for the first sprint 🥅: 
1. Add Interactive UI components. 
2. Integrated Modals.
3. Interactive Graphical Interface.
4. Wiring States between components.

## **State Management 🏢:**

There are two state managements that manages the overall state of the application:
 
 1. TransactionContextProvider: Manages all the transactions happening in the application. It contains the following attributes: <br/>
                                1. TransactionDescription[] <br/>
                                2. addTransaction()<br/>
                                3. editTransaction()<br/>
                                4. filterTransactionsByPaymentMethod()<br/>
                                5. filterTransactionsByDate()<br/>
                                6. filterTrasactionsByCategory()<br/>
    
    TransactionDescription is an object with the following properties:<br/>
                                1. date: Date                             (required)<br/>
                                2. category: string                       (optional)<br/>
                                3. name: string                           (required)<br/>
                                4. type: enum(credit, debit)              (required)<br/>
                                5. paymentAmount: number                  (required)<br/>
                                6. paymentMethod: string                  (optional)<br/>
                                7. additionalNotes: string                (optional)<br/>
                                8. currency: enum(EURO, USD, GBP, JPY)    (required)<br/>
                                9. repeatedTransaction: boolean           (optional)<br/>
                                10. id: string                            (required)<br/>
 
 2. UserContextProvider: Manages state of the user profile. It contains the following attributes: <br/>
                         1. Income: number (optional) <br/>
                         2. thresholdExpense: ThresholdExpenseCategories[] (optional) <br/>
                         3. firstName: string (optional) <br/>
                         4. lastName: string (optional)<br/>
                         5. loginEmail: string (optional)<br/>
                         6. onLogin()<br/>
                         7. onLogout()<br/>
                         8. loginStatus: boolean<br/>
   
   ThresholdExpenseCategories is an object which helps to limit the budget of each category and overall budget: <br/>
                        1. category: string <br/>
                        2. thresholdBudget: number <br/>
                       

## **UI Navigation 🗺:**

**navigation/index.tsx:** contains all navigation logic, whether a screen should be rendered as a Modal, Screen or Card. Additionally, it enables customization of header UI
                      components as well as functional components.

---

## **UI Screens 💻:**

**screens/TabOneScreen.tsx:** contains the UI logic for rendering the transactional list and net credit and debit. It also has a modal to either edit or add a transaction. 
                          If list transaction is clicked --> edit the transaction, else if Plus Item is clicked --> add a new transaction. While editting a transaction, 
                          additional props are passed to the modal to present the previous state of the transaction. After making an edit or adding a new transaction,
                          **editTransaction** or **addTransaction** methods are called in TransactionContextProvider. After updating the TransactionContextProvider state
                          it re-renders all the components and passes them the new state.
                          
**screens/TabTwoScreen.tsx:** contains the UI logic for rendering the graphical user interface. It contains two graphical interfaces: Line Chart and Pie Chart. Data is passed
                          from a global state TransactionContextProvider as props in order to render the graphs. It contains a popup filter modal that calls either 
                          **filterTransactionByDate**, **filterTransactionByPaymentMethod** and **filterTransactionByCategory** depending on the filter chosen from 
                          TransactionContextProvicer.

**screens/MyProfile.tsx:**    contains the UI logic for rendering and editing the user's first and last name and other controlling other UserContextProvider state like login and logout.

**uiComponents/HeaderButton.tsx**: Header Button component that renders 2 buttons (❌ and ✅) on the header of modals. Used for confirming and action or go back to the previous screen.


## **Additional UI Features ➕:**

**CurrencyConverter.ts:** Converts the currency type to symbols. Example: "USD" -> "$"

**Note:** Other Objects' properties can be found in **interfaces.ts**.

---

## Mapping of Different Components 🔗:

![image](https://user-images.githubusercontent.com/94879785/170838600-05673e14-de15-4795-bdfd-c66c7ce9f70c.png)

---

## Use Case Digram 👤:

![image](https://user-images.githubusercontent.com/94879785/170838632-095a8d22-2aac-4118-b899-32e2c65b7714.png)


