import { TransactionDescription } from "../../interface";

interface filterProps {
  category: string[];
  fromDate: { day: string; month: string; year: string };
  toDate: { day: string; month: string; year: string };
  paymentMethod: string[];
  paymentAmount: { minPaymentAmount: string; maxPaymentAmount: string };
}
export function FilterCategories(
  filter: filterProps,
  transactions: TransactionDescription[]
) {
  console.log("here");
  if (
    filter.fromDate.day !== "" &&
    filter.fromDate.month !== "" &&
    filter.fromDate.year !== ""
  ) {
    const fromDate = convertStringToDate(
      filter.fromDate.day,
      filter.fromDate.month,
      filter.fromDate.year
    );

    // console.log("1");
    // console.log("fromDate-->", fromDate);

    transactions = transactions.filter((transaction) => {
      return transaction.date.getTime() >= fromDate.getTime();
    });
  }

  if (
    filter.toDate.day !== "" &&
    filter.toDate.month !== "" &&
    filter.toDate.year !== ""
  ) {
    const toDate = convertStringToDate(
      filter.toDate.day,
      filter.toDate.month,
      filter.toDate.year
    );
    console.log("2");
    transactions = transactions.filter((transaction) => {
      return transaction.date <= toDate;
    });
  }

  console.log(filter);

  if (parseFloat(filter.paymentAmount.minPaymentAmount) > 0) {
    console.log("3");
    transactions = transactions.filter((transaction) => {
      return (
        transaction.paymentAmount >=
        parseFloat(filter.paymentAmount.minPaymentAmount)
      );
    });
  }

  if (parseFloat(filter.paymentAmount.maxPaymentAmount) > 0) {
    console.log("maxpayment");

    transactions = transactions.filter((transaction) => {
      return (
        transaction.paymentAmount <=
        parseFloat(filter.paymentAmount.maxPaymentAmount)
      );
    });
  }
  console.log("here-->", filter.category);
  if (filter.paymentMethod.length > 0) {
    console.log("5");

    transactions = transactions.filter((transaction) => {
      return filter.paymentMethod.includes(transaction.paymentMethod);
    });
  }

  if (filter.category.length > 0) {
    console.log("6");

    transactions = transactions.filter((transaction) => {
      return filter.category.includes(transaction.category);
    });
  }

  return transactions;
}

function convertStringToDate(day: string, month: string, year: string): Date {
  const dateString =
    year.toString() +
    "-" +
    (month.toString().length === 1
      ? "0" + month.toString()
      : month.toString()) +
    "-" +
    (day.toString().length === 1 ? "0" + day.toString() : day.toString());

  console.log(dateString);
  const date = new Date(dateString);

  return date;
}
