import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './pages/Home'


//ROUTER
function App() {
  return (
       <>
       <div className="background">
        <header className="container"><p className="logo">Curreny Converter</p></header>
        <main className="container"><Home /></main>
       </div> 
        <footer className="container">CC Daniel Bielecki 2020</footer>
       </>
  )
}

export default App;
