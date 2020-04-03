import React, { useState, useEffect } from 'react';
import '../../pages/Home/style.scss';
import {Amount} from "./amount";
import {From} from "./from";
import {To} from "./to";
import {Convert} from "./convert";
import {Result} from "./result";
import {Reverse} from "./reverse";



export default function Calculator(props) {
    const [exchangeRates, setExchangeRates] = useState("");
    const [amount, setAmount] = useState("");
    const [from, setFrom] = useState("USD");
    const [to, setTo] = useState("JPY");
    const [date, setDate] = useState("");
   

    const handleSetExchangeRates = (currencyA, currencyB) => {
      let key = "";
      const generateKey = () => {
        let keys = ["OQYX4SMJZYKJPIWG", "YA9TMMH82T56I9QM", "OXKBMEWG5OYA2B6C", "RN810ONN8YV9E1K9", "HEW086EWT84N0XEJ", "L6ZZECGHJAAZDF8C", "FK6Q6RQPZATQ3PYE", "6NQECCZSLWVZ8L4U", "TUJUFVSD4RVTEX7Z", "WKJG4MF2Q6CGS9YE"]
        return key = keys[Math.floor(Math.random() * 10)];
      }
      generateKey()
      let path = `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${currencyA}&to_currency=${currencyB}&apikey=${key}`;
     return fetch(path)
         .then(resp => {
            return resp.json()
          })
         .then( resp => {
            setExchangeRates(resp["Realtime Currency Exchange Rate"]["5. Exchange Rate"]);
            setDate(resp["Realtime Currency Exchange Rate"]["6. Last Refreshed"]);            
          })
    }

    useEffect(() => {
      props.getCurrency(from, to);
    });

    const handleSetAmount = (quantity) => {
      setAmount(quantity);
    }

    const handleSetFrom = (currency) => {
      setFrom(currency);
    }

    const handleSetTo = (currency) => {
      setTo(currency);
    }

    const showResult = () => {
      let result = document.querySelector(".result");
      result.style.display = "inline-block";
      
    }
    
    const hideResult = () => {
      let result = document.querySelector(".result");
      result.style.display = "none";
    }

    const reverse = () => {
      setFrom(to);
      setTo(from);
      let result = document.querySelector(".result");
      result.style.display = "none";      
    }

    return (<>
             <div className="amount"><Amount putAmount={handleSetAmount} amount={amount} hide={hideResult}/></div>
             <div className="from"><div className="flag-from"><img src={require(`../../images/${from}.jpg`)}/></div><div className="from-select"><From putFrom={handleSetFrom} from={from} hide={hideResult}/></div></div>             
             <div><Reverse reverse={reverse}/></div>
             <div className="to"><div className="flag-to"><img src={require(`../../images/${to}.jpg`)}/></div><div className="to-select"><To putTo={handleSetTo} to={to} hide={hideResult}/></div></div>
             <div className="convert"><Convert convert={handleSetExchangeRates} from={from} to={to} show={showResult}/></div> 
             <div className="result"><Result amount={amount} exchangeRates={exchangeRates} from={from} to={to} date={date}/></div>                                      
             </>)
    
}

