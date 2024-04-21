import Header from '../components/Header'
import Content from '../components/Content';
import ModalGetStarted from '../components/ModalGetStarted';
import { useState, useEffect} from 'react';
import Web3 from 'web3';
import ETH from "../contracts/Ehr.json"
import SigninModal from '../components/SignInModal';
import { useNavigate } from 'react-router-dom';
import Confirmation from '../components/Confirmation';

function FirstPage() {
  const navigate = useNavigate();
  const[modal,setmodal] = useState(false);
  const[state, setState] = useState({web3: null, contract: null});
  const[signinmodal, setSigninModal] = useState(false);
  const[conf, setconf] = useState(false);
  const[confdata, setconfdata]  = useState({gas:'', gasPrice:'', totalCost:'', status:false});

  useEffect( () => {

    const provider = new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545");

    async function template()
    {
      const web3 = new Web3(provider);
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = ETH.networks[networkId];
      const contract = new web3.eth.Contract( ETH.abi, deployedNetwork.address);
      
      setState({web3: web3, contract:contract});
    }

    provider && template();
  }, []);

  function ConfHandler() 
  {
    setconf(!conf);
  }


  function ClickHandler()
  {
    setmodal( (state) => !state);
  }

  function SignInHandler()
  {
    setSigninModal((state) => !state);
  }

  async function verifyAddressWithBalance(address) {
    try {
      const balance = await state.web3.eth.getBalance(address);
      const isValid = balance !== '0';
      console.log(isValid);
      return isValid;
    } catch (error) {
      console.error("Error verifying address with balance:", error);
      return false;
    }
  }
  

  async function handleAddressReceived(input) {
    const address = input.public_add;
    const name = input.first_name + " " + input.last_name;

    const isValidAddress = await verifyAddressWithBalance(address);
    if (isValidAddress) {
      alert('Address is valid and has balance. Proceeding to authorize provider...');
      try {
        const contract = state.contract;
        const gas = await contract.methods.ValidateDoctor(address, name).estimateGas({ from: address });
        console.log(gas);
        const gasPrice = await state.web3.eth.getGasPrice();
        const totalCost = gas * gasPrice;
        await contract.methods.ValidateDoctor(address, name).send({ from: address, gas: '120000'});
        // alert(`Address authorized successfully, Gas used: ${gas}, Gas price: ${gasPrice}, Total Cost: ${totalCost} `);
        
        setconfdata({gas:gas, gasPrice:gasPrice, totalCost: totalCost, status: true });
        setconf(true);
        setmodal( false);
        
        
      } catch (error) {
        console.error('Error authorizing provider:', error);
        alert('Failed to authorize provider');
      }
    } else {
      alert('Invalid address or insufficient balance.');
    }
  }
  // async function checkAuthorization(address, patientId) {
  //   try {
  //     const contract = state.contract;
  //     const isAuthorized = await contract.methods.authorizedProviders(patientId, address).call();
  //     return isAuthorized;
  //   } catch (error) {
  //     console.error('Error checking authorization:', error);
  //     return false;
  //   }
  // }
  
  async function handleCheckAuthorization(input) {
    const address1 = input.public_add;
    const contract = state.contract;
    const isAuthorized = await contract.methods.checkDoctor(address1).call();
    if (isAuthorized) {
      alert('The address is authorized.');
      navigate('/doctors');
    } else {
      alert('The address is not authorized.');
    }
  }
  




  return (
    <>
   
    <Header onHandle= {SignInHandler} onSign = {ClickHandler} />
    
    <Content onModal={ClickHandler}/>
    {conf &&<Confirmation onData = {confdata} onClose = {ConfHandler} />} 
    {signinmodal && <SigninModal onModal = {SignInHandler} onFormReceived = {handleCheckAuthorization} />}
    {modal && <ModalGetStarted onModal={ClickHandler} onFormReceived={handleAddressReceived} />}
    
    </>
  
  )
}

export default FirstPage;
