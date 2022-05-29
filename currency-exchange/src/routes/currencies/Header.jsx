import React from 'react';
import './Header.css';

export default function Currencies(props) {

  const {rates} = props;

   let currency = Object.keys(rates);
   let exchangeRates = Object.values(rates);

   let displayRates = currency.map((Currency, i) => {
     return (
       <>
       <div key={Currency} className='ratesElement'>
         <span className='currencyName'>{Currency}:</span>
         <span>{exchangeRates[i]},</span>
       </div>
       </>
     )
   })
    
  return (
    <div className='header'>
      <p className='message'>Daily rates:</p>
      {displayRates}              
    </div>
  );
}
