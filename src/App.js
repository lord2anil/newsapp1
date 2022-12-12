
import './App.css';

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'


export default class App extends Component {
  pagesize=6;
  state={
    progress:0
  }
  setProgress=(progress)=>{
    this.setState({progress:progress})
  }
  render() {
    return (
    <BrowserRouter>
        <Navbar/>
        <LoadingBar
        color='#f11946'
        height={2}
        className="loader"
        progress={this.state.progress}
        
      />

      <Routes>
        <Route exact path="/" element={ <News    setProgress={this.setProgress} key={1}  pagesize={this.pagesize} country="in" category="general"/>}/>
        <Route exact path="/Sports" element={ <News    setProgress={this.setProgress} key={2}  pagesize={this.pagesize} country="in" category="sports"/>}/>
        <Route exact path="/General" element={ <News    setProgress={this.setProgress} key={3}  pagesize={this.pagesize} country="in" category="general"/>}/>
        <Route exact path="/Entertainment" element={ <News    setProgress={this.setProgress} key={4}  pagesize={this.pagesize} country="in" category="entertainment"/>}/>
        <Route exact path="/Health" element={ <News    setProgress={this.setProgress} key={5}  pagesize={this.pagesize} country="in" category="health"/>}/>
        <Route exact path="/Science" element={ <News    setProgress={this.setProgress}  key={6} pagesize={this.pagesize} country="in" category="science"/>}/>
        <Route exact path="/Technology" element={ <News    setProgress={this.setProgress} key={7}  pagesize={this.pagesize} country="in" category="technology"/>}/>
      </Routes>
        
    </BrowserRouter>
    
    )
  }
}
