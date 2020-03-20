import React, { useState, useEffect } from 'react'

const Result = (props) => {
   
    return (<>
               <p className="converted-sum">{props.amount} {props.from} = {parseFloat(props.amount * props.exchangeRates).toPrecision(7)} {props.to}</p>
               <p className="converted">1 {props.from} = {parseFloat(props.exchangeRates).toPrecision(4)} {props.to}</p>
               <p className="converted">1 {props.to} = {parseFloat((1/(props.exchangeRates))).toPrecision(4)} {props.from}</p>
               <p className="date">{props.date} GMT</p>
            </>)
  }

  export {Result}