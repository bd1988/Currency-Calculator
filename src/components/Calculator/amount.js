import React, { useState, useEffect } from 'react'

const Amount = (props) => {
    
  
    const handleInput = event => {
      props.putAmount(event.target.value);
      props.hide();
    };
  
    return (
      <>
        <form>          
          <input placeholder="Amount" onChange={handleInput} value={props.amount} />
        </form>
      </>
    );
  };

  export {Amount};