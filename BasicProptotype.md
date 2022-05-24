
<img src="https://user-images.githubusercontent.com/94879785/169922011-e88eadd0-380f-4fce-b372-74296c2207f4.png" width="100"> 

**MoneyIO Basic Prototype:**




Tasks for the first sprint: 
1. Add Interactive UI components. 
2. Integrated Modals.
3. Interactive Graphical Interface.
4. Wiring States between components.

---

**State Management:**

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
 
 2. UserContextProvider: Manages state of the user profile. It contains the following attributes:
                         1. Income: number
                         2. thresholdExpense: ThresholdExpenseCategories.

---
**Task 1**

**Navigation:**

navigation/index.tsx: contains all navigation logic, whether a screen should be rendered as a Modal, Screen or Card. Additionally, it enables customization of header UI
                      components as well as functional components.

---

**UI Screens:**

screens/TabOneScreen.tsx: contains the UI logic for rendering the transactional list and net credit and debit. It also has a modal to either edit or add a transaction. 
                          If list transaction is clicked --> edit the transaction, else if Plus Item is clicked --> add a new transaction. While editting a transaction, 
                          additional props are passed to the modal to present the previous state of the transaction. After making an edit or adding a new transaction,
                          **editTransaction** or **addTransaction** methods are called in TransactionContextProvider. After updating the TransactionContextProvider state
                          it re-renders all the components and passes them the new state.
                          
screens/TabTwoScreen.tsx: contains the UI logic for rendering the graphical user interface. It contains two graphical interfaces: Line Chart and Pie Chart. Data is passed
                          from a global state TransactionContextProvider as props in order to render the graphs. It contains a popup filter modal that calls either 
                          **filterTransactionByDate**, **filterTransactionByPaymentMethod** and **filterTransactionByCategory** depending on the filter chosen from 
                          TransactionContextProvicer.

screens/MyProfile.tsx:    contains the UI logic for rendering and editing the 


