import React, { useState, useEffect } from 'react'

const Reverse = (props) => {
    
  
    const handleClick = () => {
      props.reverse()      
    };
  
    return (
      <img className="reverse" src={require("../../images/double-arrow.png")} onClick={handleClick}></img>
    );
  };

  export {Reverse};