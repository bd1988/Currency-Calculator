import React, { useState, useEffect } from 'react'
import currencies from "./currencies"

const From = (props) => {
    

    const handleFrom = event => {
      props.putFrom(event.target.value);
      props.hide();
    }
console.log(props.from)
    return (<>
              <select 
                value={props.from}
                onChange={handleFrom}>
                {currencies.map((element) => {
                  return <option key={element.symbol} value={element.symbol}>{element.name}</option>
                })}               
              </select>
            </>)
  }

  export {From}