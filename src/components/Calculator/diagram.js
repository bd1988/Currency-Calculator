import React, {useState} from 'react';
import Calculator from '.';

const Diagram = (props) => {
    const [days, setDays] = useState("");
    const [showDiagram, setDiagram] = useState(false);
    const [open, setOpen] = useState("");
    const [close, setClose] = useState("");
    const [high, setHigh] = useState("");
    const [low, setLow] = useState("");
    const [change, setChange] = useState("");
    const [stick, setStick] = useState("");
    const [direction, setDirection] = useState("");
    const [range, setRange] = useState("");
    const [conversionRatio, setConversionRatio] = useState("");

    const getData = (currencyA, currencyB) => {
        let key = "";        
        const generateKey = () => {
          let keys = ["OQYX4SMJZYKJPIWG", "YA9TMMH82T56I9QM", "OXKBMEWG5OYA2B6C", "RN810ONN8YV9E1K9", "HEW086EWT84N0XEJ", "L6ZZECGHJAAZDF8C", "FK6Q6RQPZATQ3PYE", "6NQECCZSLWVZ8L4U", "TUJUFVSD4RVTEX7Z", "WKJG4MF2Q6CGS9YE"]
          return key = keys[Math.floor(Math.random() * 10)];
        }        
        generateKey();        
        let path = `https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=${currencyA}&to_symbol=${currencyB}&apikey=${key}`;
              return fetch(path)
           .then(resp => {
              return resp.json()
            })
           .then( resp => {
              setDays(resp["Time Series FX (Daily)"]);             
            })        
      }    
 
    const setData = () => {
      getData(props.from, props.to);      
      let openArray = [];
      let closeArray = [];
      let highArray = [];
      let lowArray = [];
      let changeArray = [];
      let stickArray = [];
      let directionArray = [];
      let rangeValue = 1;      
      let conversionRatioValue = 1;
      let min;
      let max;
      var x;
      let i;
      for (x in days) {
        openArray.push(days[x]["1. open"]);
        closeArray.push(days[x]["4. close"]);
        highArray.push(days[x]["2. high"]);
        lowArray.push(days[x]["3. low"]);
      }
      for (i=0; i <= openArray.length -1; i++) {
         changeArray.push(Math.abs(openArray[i] - closeArray[i]));
         stickArray.push(highArray[i] - lowArray[i]);
         if (closeArray[i] > openArray[i]) {
            directionArray.push("up");
         } else if (closeArray[i] < openArray[i]) {
          directionArray.push("down")
         } else {
          directionArray.push("noChange")
         }       
      }
      rangeValue = Math.max(...highArray) - Math.min(...lowArray);
      conversionRatioValue = 500/rangeValue;
      min = Math.min(...lowArray);
      max = Math.max(...highArray);
      setOpen(openArray.reverse());
      setClose(closeArray.reverse());
      setHigh(highArray.reverse());
      setLow(lowArray.reverse());
      setChange(changeArray.reverse());
      setStick(stickArray.reverse());
      setDirection(directionArray.reverse());
      setRange(rangeValue);
      setConversionRatio(conversionRatioValue);
    }

    const display = () => {          
      setDiagram(true);      
      }
    
    const chart = () => {          
       let chart = [];
       let candlePositionX = [];
       let candlePositionY = [];
       var x;
       for (x=0; x <= open.length; x++) {
           if (direction[x] === "up") {
             candlePositionY.push(((open[x] - Math.min(...low)) * conversionRatio + 50 + "px"));
           } else if (direction[x] === "down") {
            candlePositionY.push(((close[x] - Math.min(...low)) * conversionRatio + 50 + "px"));
           } else if (direction[x] === "noChange") {
            candlePositionY.push(((open[x] - Math.min(...low)) * conversionRatio + 50 + "px"));
           }
       }
       for (x=0; x <= open.length; x++) {
          candlePositionX.push( (((1300 / open.length)*x + (1300 / (open.length*2))) + "px"))
       }     
       for (x=0; x <= open.length - 1; x++) {
       chart.push(<div style={{height: stick[x] * conversionRatio + "px", bottom: (low[x] - Math.min(...low)) * conversionRatio + 50 + "px", left: (1300 / (open.length * 2)) * (2 * x + 2) + "px"}} className={`stick ${direction[x]}`} key={x + "c"}></div>);
       chart.push(<div style={{width: ((1300 / open.length) - 2) + "px", height: change[x] * conversionRatio + "px", bottom: candlePositionY[x], left: candlePositionX[x]}} className={`candle ${direction[x]}`} key={x + "c"}></div>);
       }
       return chart;
       }
    
     if (showDiagram === false) {
           return (
           <>
             <button onClick={setData}>Get data</button>
             <button onClick={display}>Display chart</button>
           </>)
        } else {
          return (
           <>
            <div className="chart">{chart()}</div>                   
          </>)    
        }
}

export {Diagram};