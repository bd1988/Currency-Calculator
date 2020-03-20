import React, { useState, useEffect } from 'react'

  const Convert = (props) => {
    
    const handleClick = () => {
      props.convert(props.from, props.to);
      props.show();
    }

    return (<>
               <button onClick={handleClick}>Convert!</button>
            </>)
  }

  export {Convert}