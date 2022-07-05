import {
  category,
  paymentMethod,
  TransactionDescription,
} from "../../interface";

interface filterProps {
  category: category[];
  fromDate: { day: string; month: string; year: string };
  toDate: { day: string; month: string; year: string };
  paymentMethod: paymentMethod[];
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

    const paymentMethodToFilter: string[] = [];
    for (var i = 0; i < filter.paymentMethod.length; i++) {
      paymentMethodToFilter.push(filter.paymentMethod[i].id);
    }
    transactions = transactions.filter((transaction) => {
      return filter.paymentMethod.includes(transaction.paymentMethod?.id);
    });
  }

  if (filter.category.length > 0) {
    const categoriesToFilter: string[] = [];
    for (var i = 0; i < filter.category.length; i++) {
      categoriesToFilter.push(filter.category[i].id);
    }

    transactions = transactions.filter((transaction) => {
      return categoriesToFilter.includes(transaction.category.id);
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
