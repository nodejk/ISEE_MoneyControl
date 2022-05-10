export function getCurrencySymbol(currencyString: string) {
  if (currencyString === "USD") {
    return "\u0024";
  } else if (currencyString === "EURO") {
    return "\u20AC";
  } else if (currencyString === "GBP") {
    return "\u00A3";
  } else if (currencyString === "YEN") {
    return "\u00A5";
  } else {
    return "INVALID_CURRENCY";
  }
}
