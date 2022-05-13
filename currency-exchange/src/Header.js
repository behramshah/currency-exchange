import React from 'react';
import './Header.css';

export default function Header(props) {

  const {rates} = props;

   let currency = Object.keys(rates);
   let exchangeRates = Object.values(rates);

   let displayRates = currency.map((Currency, i) => {
     return (
       <>
       <div key={Currency} classname='ratesElement' style={{margin: "0 10px"}}>
         <span classname='currencyName' style={{margin: "0 5px 0 0"}}>{Currency}:</span>
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
