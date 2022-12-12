
import './App.css';

import React,{useState}  from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'


export default function App () {
  const [progress, setprogress] = useState(0)
  const pagesize=6;
  
  const setProgress=(progress)=>{
    setprogress(progress)
  }
  
    return (
    <BrowserRouter>
        <Navbar/>
        <LoadingBar
        color='#f11946'
        height={2}
        className="loader"
        progress={progress}
        
      />

      <Routes>
        <Route exact path="/" element={ <News    setProgress={setProgress} key={1}  pagesize={pagesize} country="in" category="general"/>}/>
        <Route exact path="/Sports" element={ <News    setProgress={setProgress} key={2}  pagesize={pagesize} country="in" category="sports"/>}/>
        <Route exact path="/General" element={ <News    setProgress={setProgress} key={3}  pagesize={pagesize} country="in" category="general"/>}/>
        <Route exact path="/Entertainment" element={ <News setProgress={setProgress} key={4}  pagesize={pagesize} country="in" category="entertainment"/>}/>
        <Route exact path="/Health" element={ <News    setProgress={setProgress} key={5}  pagesize={pagesize} country="in" category="health"/>}/>
        <Route exact path="/Science" element={ <News    setProgress={setProgress}  key={6} pagesize={pagesize} country="in" category="science"/>}/>
        <Route exact path="/Technology" element={ <News    setProgress={setProgress} key={7}  pagesize={pagesize} country="in" category="technology"/>}/>
      </Routes>
        
    </BrowserRouter>
    
    )
  
}
