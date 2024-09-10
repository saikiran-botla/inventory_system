import React,{useEffect,useState} from 'react'
import {BrowserRouter as Router,Routes,Route, BrowserRouter,Redirect,Navigate} from "react-router-dom"
import Cookies from 'js-cookie';

import InputCreds from "./components/login";
import HomePage  from './components/HomePage';
import RegisterCreds from './components/register';
import AddInventory from './components/Addinventory';


function App() {



  return(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<InputCreds/>}></Route>
        <Route path='/home' element={<HomePage/>}></Route>
        <Route path='/register' element={<RegisterCreds/>}></Route>
        <Route path='/addinventory' element={<AddInventory/>}></Route>

      </Routes>
    </BrowserRouter>
  );
  
}

export default App;