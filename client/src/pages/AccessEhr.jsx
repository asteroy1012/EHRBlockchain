import DoctorsHeader from "../components/DoctorsHeader"
import ViewRecords from "../components/ViewRecords";
import EHRModal from "../components/EHRModal";
import Web3 from "web3";
import ETH from "../contracts/Ehr.json";
import { useState, useEffect } from 'react';
import EhrRecords from "../components/EhrRecords";
function AccessEhr({data}) {

    const[state, setState] = useState({web3: null, contract: null});
    const[toggle, settoggle] = useState(false);
    const [incdata, setIncdata] = useState([]);
    const[id, setid] = useState(0);
    const[medicalRecords, setMedicalRecords] = useState([]);

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

    useEffect( ()=>{
        fetchMedicalRecords();
    },[]);


    function clickHandler()
    {
        
        settoggle( !toggle);

    }

    async function verifyAddressWithBalance(address) {
        if (!address) {
            console.error("Empty address provided");
            return false;
        }
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
    const updatedData = [...incdata, input];
    setid((iid) =>{iid++});
    // Update the state with the new data array
    setIncdata(updatedData);
        const address = input.public_address;
        const isValidAddress = await verifyAddressWithBalance(address);
        if(isValidAddress) {
            alert('Address is valid and has balance. Proceeding to add a record...');
            try{

                const contract = state.contract;
                    const gas = await contract.methods.addMedicalRecord(id, input.p_name, input.cond ).estimateGas({from: address});
                    const receipt = await contract.methods.addMedicalRecord(id, input.p_name, input.cond).send({from: address, gas:'161108'});
                    alert(`Medical Record added, Gas used: ${gas}, TxnHash: ${receipt.transactionHash}`);
                    fetchMedicalRecords();
            }

            catch(error)
            {
                console.error('Error adding medical record', error);
                alert('Failed to add the record');
            }
        }
        


    }

    async function fetchMedicalRecords() {
        try{
            const contract = state.contract;
            const recordsCount = await contract.methods.getMedicalRecordCount().call();
            const records = [];
            for(let i=0; i< recordsCount; i++)
            {
                const record = await contract.methods.getMedicalRecords(i).call();
                console.log(record);
                records.push(record);
            }

            setMedicalRecords(records);
        }

        catch(e){

            console.error('Error fetching medical records', e);
        }
    }

    let inp = data;
    return(
        <>
        <DoctorsHeader doctorHandle = {clickHandler} />
        <ViewRecords getData = {inp}/>
        <EhrRecords forwardData = {medicalRecords} />
        {toggle && <EHRModal onSub = {clickHandler}  onGet = {getdata} />}
        </>

);
}

export default AccessEhr;