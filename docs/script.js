const currencySymbols = {
  USD: "$", EUR: "€", GBP: "£", INR: "₹", JPY: "¥",
  AUD: "A$", CAD: "C$", CHF: "Fr", CNY: "¥", RUB: "₽",
  KRW: "₩", BRL: "R$", ZAR: "R", SGD: "S$", NZD: "NZ$",
  AED: "د.إ", HKD: "HK$", THB: "฿", MXN: "$", SEK: "kr"
};

const currencyList = Object.keys(currencySymbols);
const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");

currencyList.forEach(code => {
  const option1 = document.createElement("option");
  const option2 = document.createElement("option");
  option1.value = option2.value = code;
  option1.textContent = `${code} (${currencySymbols[code]})`;
  option2.textContent = `${code} (${currencySymbols[code]})`;
  fromCurrency.appendChild(option1);
  toCurrency.appendChild(option2);
});

fromCurrency.value = "USD";
toCurrency.value = "INR";

async function convertCurrency() {
  const amount = document.getElementById("amount").value;
  const from = fromCurrency.value;
  const to = toCurrency.value;
  const resultElement = document.getElementById("result");

  if (amount === "" || amount <= 0) {
    resultElement.textContent = "⚠️ Please enter a valid amount.";
    return;
  }

  try {
    const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${from}`);
    const data = await response.json();
    const rate = data.rates[to];
    const converted = (amount * rate).toFixed(2);
    resultElement.textContent = `${amount} ${currencySymbols[from]} = ${converted} ${currencySymbols[to]}`;
  } catch (error) {
    resultElement.textContent = "❌ Conversion failed. Try again later.";
  }
}
