import React, { useState, useEffect } from 'react'
import currencies from './currencies'

const To = (props) => {
    

    const handleTo = event => {
      props.putTo(event.target.value);
      props.hide();
    }
    console.log(props.to)
    return (<>
              <select 
                value={props.to}
                onChange={handleTo}>
                {currencies.map((element) => {
                  return <option key={element.symbol} value={element.symbol}>{element.name}</option>
                })}   
              </select>
            </>)
  }

  export {To}