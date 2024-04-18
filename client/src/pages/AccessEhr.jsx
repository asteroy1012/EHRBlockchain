import DoctorsHeader from "../components/DoctorsHeader"
import ViewRecords from "../components/ViewRecords";
import EHRModal from "../components/EHRModal";
import Web3 from "web3";
import ETH from "../contracts/Ehr.json";
import { useState, useEffect } from 'react';
import EhrRecords from "../components/EhrRecords";
function AccessEhr() {

    const[state, setState] = useState({web3: null, contract: null});
    const[toggle, settoggle] = useState(false);
    const [incdata, setIncdata] = useState([]);
    const[doctorToggle, setdoctorToggle] = useState(false);
    const[recordToggle, setRecordToggle] = useState(false);


    function onRecordClick()
    {
        setRecordToggle( (state) => !state);
    }

    function onDocClick()
    {
        setdoctorToggle((state) => !state);
        
    }

    useEffect( () =>{

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

    },[]);

    // useEffect( ()=>{
    //     fetchMedicalRecords();
    // },[]);


    function clickHandler()
    {
        
        settoggle( !toggle);

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

    async function getdata(input)
    {
        const address = input.public_address;
        const name = input.p_name;
        const condition = input.cond;
        const isValidAddress = await verifyAddressWithBalance(address);
        if(isValidAddress) {
            alert('Address is valid and has balance. Proceeding to add a record...');
            try{

                const contract = state.contract;
                    const gas = await contract.methods.addMedicalRecord(address,name, condition).estimateGas({from: address});
                    const receipt = await contract.methods.addMedicalRecord(address, name, condition).send({from: address, gas:'143628'});//gas:'161108';
                    alert(`Medical Record added, Gas used: ${gas}, TxnHash: ${receipt.transactionHash}`);
                    // fetchMedicalRecords();
            }

            catch(error)
            {
                console.error('Error adding medical record', error);
                alert('Failed to add the record');
            }
        }
        


    }

    return(
        <>
        <DoctorsHeader doctorHandle = {clickHandler} onView = {onDocClick} onRecordView = {onRecordClick} />
        
        {recordToggle && <EhrRecords forwardData = {incdata} />}
        {toggle && <EHRModal onSub = {clickHandler}  onGet = {getdata} />}
        {doctorToggle && <ViewRecords />}
        </>

);
}

export default AccessEhr;