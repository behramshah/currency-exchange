import React, { useEffect, useState } from 'react';
import CurrencyRow from '../../CurrencyRow';


const BASE_URL = 'https://api.fastforex.io/fetch-all?from=UAH&api_key=96fe29ef49-5aa2478730-rckzsr';
const requestOptions = {method: 'GET', headers: {Accept: 'application/json'}};

export default function Converter() {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [rates, setRates] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [amount, setAmount] = useState(1);
  const [toAmount, setToAmount] = useState(0);
  const [toAmountChanged, setToAmountChanged] = useState(false);

  useEffect(() => {
    fetch(BASE_URL, requestOptions)
      .then(res => res.json())
      .then(res => {
        const firstCurrency = Object.keys(res.results)[0]
        const firstCurrencyvalue = Object.values(res.results)[0]
        setCurrencyOptions([res.base, ...Object.keys(res.results)])
        setFromCurrency(res.base)
        setToCurrency(firstCurrency)
        setRates(res.results)
        setToAmount(firstCurrencyvalue)
      })
      .catch(error => console.log('error', error));
  }, [])

  useEffect(() => {
    if (!toAmountChanged) {
    fetch(BASE_URL, requestOptions)
      fetch(`https://api.fastforex.io/convert?from=${fromCurrency}&to=${toCurrency}&amount=${amount}&api_key=96fe29ef49-5aa2478730-rckzsr`, requestOptions)
        .then(res => res.json())
        .then(res => setToAmount(Object.values(res.result)[0]))
        .catch(error => console.log('error', error));
    } else if (toAmountChanged) {
      fetch(BASE_URL, requestOptions)
        fetch(`https://api.fastforex.io/convert?from=${toCurrency}&to=${fromCurrency}&amount=${toAmount}&api_key=96fe29ef49-5aa2478730-rckzsr`, requestOptions)
          .then(res => res.json())
          .then(res => setAmount(Object.values(res.result)[0]))
          .catch(error => console.log('error', error));
      }
  }, [fromCurrency, toCurrency, toAmount, amount, toAmountChanged])

  function handleFromAmountChange(e) {
    setAmount(e.target.value)
    setToAmountChanged(false)
  }

  function handleToAmountChange(e) {
    setToAmount(e.target.value)
    setToAmountChanged(true)
  }

  function handleChangeFromCurrency(e) {
    setFromCurrency(e.target.value)
    setToAmountChanged(false)
  }

  function handleChangeToCurrency(e) {
    setToCurrency(e.target.value)
    setToAmountChanged(true)
  }

  return (
    <>
      <h1>Convert</h1>
      <CurrencyRow
        currencyOptions={currencyOptions}
        selectedCurrency={fromCurrency}
        onChangeCurrency={handleChangeFromCurrency}
        onChangeAmount={handleFromAmountChange}
        amount={amount}
      />
      <div className="equals">=</div>
      <CurrencyRow
        currencyOptions={currencyOptions}
        selectedCurrency={toCurrency}
        onChangeCurrency={handleChangeToCurrency}
        onChangeAmount={handleToAmountChange}
        amount={toAmount}
      />
    </>
  );
};