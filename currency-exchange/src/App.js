import React, { useEffect, useState } from 'react';
import './App.css';
import CurrencyRow from './CurrencyRow';
import Header from './Header';

const BASE_URL = "https://api.apilayer.com/exchangerates_data/latest?symbols=USD%2C%20GBP%2C%20EUR%2C%20AZN&base=UAH"

var myHeaders = new Headers();
myHeaders.append("apikey", "SkqrP7kstPHFlJvpYayveA8nqm8JVcNu");

var requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};
  

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [rates, setRates] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [amount, setAmount] = useState(1);
  const [toAmount, setToAmount] = useState(0);

  useEffect(() => {
    fetch(BASE_URL, requestOptions)
      .then(res => res.json())
      .then(res => {
        const firstCurrency = Object.keys(res.rates)[0]
        setCurrencyOptions([res.base, ...Object.keys(res.rates)])
        setFromCurrency(res.base)
        setToCurrency(firstCurrency)
        setRates(res.rates)
      })
      .catch(error => console.log('error', error));
  }, [])

  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
    fetch(BASE_URL, requestOptions)
      fetch(`https://api.apilayer.com/exchangerates_data/convert?to=${toCurrency}&from=${fromCurrency}&amount=${amount}`, requestOptions)
        .then(res => res.json())
        .then(res => setToAmount(res.result))
        .catch(error => console.log('error', error));
    }
  }, [fromCurrency, toCurrency, toAmount, amount])

  function handleFromAmountChange(e) {
    setAmount(e.target.value)
  }

  function handleToAmountChange(e) {
    setToAmount(e.target.value)
  }

  return (
    <>
      <Header rates={rates}/>
      <h1>Convert</h1>
      <CurrencyRow
        currencyOptions={currencyOptions}
        selectedCurrency={fromCurrency}
        onChangeCurrency={e => setFromCurrency(e.target.value)}
        onChangeAmount={handleFromAmountChange}
        amount={amount}
      />
      <div className="equals">=</div>
      <CurrencyRow
        currencyOptions={currencyOptions}
        selectedCurrency={toCurrency}
        onChangeCurrency={e => setToCurrency(e.target.value)}
        onChangeAmount={handleToAmountChange}
        amount={toAmount}
      />
    </>
  );
}

export default App;