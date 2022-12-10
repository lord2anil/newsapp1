
import './App.css';

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default class App extends Component {

  render() {
    return (
      
      
      
       
    <BrowserRouter>
        <Navbar/>
      <Routes>
        <Route exact path="/" element={ <News key={1}  pagesize={5} country="in" category="general"/>}/>
        <Route exact path="/Sports" element={ <News key={2}  pagesize={5} country="in" category="sports"/>}/>
        <Route exact path="/General" element={ <News key={3}  pagesize={5} country="in" category="general"/>}/>
        <Route exact path="/Entertainment" element={ <News key={4}  pagesize={5} country="in" category="entertainment"/>}/>
        <Route exact path="/Health" element={ <News key={5}  pagesize={5} country="in" category="health"/>}/>
        <Route exact path="/Science" element={ <News  key={6} pagesize={5} country="in" category="science"/>}/>
        <Route exact path="/Technology" element={ <News key={7}  pagesize={5} country="in" category="technology"/>}/>
        
      </Routes>
    </BrowserRouter>
    
    )
  }
}
