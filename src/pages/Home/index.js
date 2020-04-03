import React,{useState} from 'react'
import Calculator from '../../components/Calculator';
import {Diagram} from '../../components/Calculator/diagram'



export default function Home() {
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");

    const getCurrency = (from, to) => {
        setFrom(from);
        setTo(to);
    }

    return (
        <>
        <section className="big-box calculator">
            <h1>Calculator</h1>
            <Calculator getCurrency={getCurrency}/>
        </section>
        <section className="diagrams">
            <Diagram from={from} to={to}/>           
        </section>        
        </>
    )
}