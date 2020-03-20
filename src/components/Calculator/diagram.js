import React, { useState, useEffect } from 'react';

const Diagram = () => {
    const [days, setDays] = useState("");

    const getData = (currencyA, currencyB) => {
        let key = "";
        const generateKey = () => {
          let keys = ["OQYX4SMJZYKJPIWG", "YA9TMMH82T56I9QM", "OXKBMEWG5OYA2B6C", "RN810ONN8YV9E1K9", "HEW086EWT84N0XEJ", "L6ZZECGHJAAZDF8C", "FK6Q6RQPZATQ3PYE", "6NQECCZSLWVZ8L4U", "TUJUFVSD4RVTEX7Z", "WKJG4MF2Q6CGS9YE"]
          return key = keys[Math.floor(Math.random() * 10)];
        }
        generateKey()
        let path = `https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=${currencyA}&to_symbol=${currencyB}&apikey=${key}`;
       return fetch(path)
           .then(resp => {
              return resp.json()
            })
           .then( resp => {
              setDays(resp["Time Series FX (Daily)"]);             
            })
      }

const getData1 = () => {
getData("EUR", "PLN");
}

const display1 = () => {
     let daysString = JSON.stringify(days);
     let replacedDaysString1 = daysString.replace(/{/g, "[");
     let replacedDaysString2 = replacedDaysString1.replace(/}/g, "]");
     let replacedDaysString3 = replacedDaysString2.replace(/:/g, ",");
     let replacedDaysString4 = replacedDaysString3
     let newArray = replacedDaysString3.split();
     console.log(replacedDaysString3);
     console.log(newArray);

}

  return (<>
      <div className="diagram"><div className="day1"></div><div className="day2"></div></div>
      <button onClick={getData1}>get data</button>
      <button onClick={display1}>display</button>
      </>
  );
}

export {Diagram};