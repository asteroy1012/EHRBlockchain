import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Web3 from "web3";
import ETH from "../contracts/Ehr.json";
export default function EhrRecords() {
    const [data, setData] = useState([]);
    const [state, setState] = useState({web3:null, contract: null });
    useEffect(() => {

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

    useEffect(() => {
        const { contract } = state;
        async function readData() {
            try {
                const doctorsArray = await contract.methods.getMedicalRecord().call();
                const flatDoctorsArray = doctorsArray.flat(); // Flatten the array of arrays
                setData(flatDoctorsArray);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        contract && readData();
    }, [state]);

    return (
        <motion.div
            initial={{ x: "-100vw" }}
            animate={{ x: 0 }}
            transition={{ duration: 1.5, type: "spring", stiffness: 40, delay: 1 }}
            className="bg-black text-white mt-10"
        >
            <h2 className="text-2xl font-bold mb-4 p-2 font-platy">Medical Records</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-platy text-gray-500 uppercase tracking-wider">Public Address</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-platy text-gray-500 uppercase tracking-wider">Patient Name</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-platy text-gray-500 uppercase tracking-wider">Condition</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {data.map((user,index) => (
                            <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap text-black font-platy">{user.provider}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-black font-platy">{user.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-black font-platy">{user.condition}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </motion.div>
    );
}
