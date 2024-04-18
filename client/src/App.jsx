// import Header from './components/Header';
// import Content from './components/Content';
// import ModalGetStarted from './components/ModalGetStarted';
// import { useState, useEffect} from 'react';
// import Web3 from 'web3';
// import ETH from "../src/contracts/Ehr.json"
// import SigninModal from './components/SignInModal';
import { RouterProvider, createBrowserRouter} from "react-router-dom";
import { useState } from "react";
import FirstPage from "./pages/FirstPage.jsx";
import AccessEhr from './pages/AccessEhr.jsx';




function App() {
  
const router = createBrowserRouter([
  {path: '/', element: <FirstPage/>},
  {path:'/doctors', element: <AccessEhr/>}
])
  



  return (


    <RouterProvider router = {router} />
  
  )
}

export default App
