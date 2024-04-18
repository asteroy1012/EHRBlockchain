// import Header from './components/Header';
// import Content from './components/Content';
// import ModalGetStarted from './components/ModalGetStarted';
// import { useState, useEffect} from 'react';
// import Web3 from 'web3';
// import ETH from "../src/contracts/Ehr.json"
// import SigninModal from './components/SignInModal';
import { RouterProvider, createBrowserRouter} from "react-router-dom";
import { useState, useEffect } from "react";
import FirstPage from "./pages/FirstPage.jsx";
import AccessEhr from './pages/AccessEhr.jsx';




function App() {
  let gotdata = [];
function getInfo(input)
{
  gotdata.push(input);
  console.log(gotdata);
}
const router = createBrowserRouter([
  {path: '/', element: <FirstPage onData = {getInfo}/>},
  {path:'/doctors', element: <AccessEhr data = {gotdata}/>}
])
  



  return (


    <RouterProvider router = {router} />
  
  )
}

export default App
