import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import LockAnimation from "./LockAnimation";
export default function Confirmation({ onData, onClose }) {

    const[trueanimation, settrueanimation] = useState(true);


     const gas = onData.gas.toString();
     const gasPrice = onData.gasPrice.toString();
     const totalCost = onData.totalCost.toString();
     const status = true;
    // console.log(onData.gas);
    // console.log(onData.gasPrice);
    // console.log(onData.totalCost);
    // console.log(onData.status);

     useEffect(() => {
        
        if (status) {
          settrueanimation((state) => !state);
        }
      }, [status]);
      

    return (
        <div className=" fixed inset-0 bg-black opacity-95 backdrop-blur-sm flex justify-center items-center">
            <motion.div initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, type: 'spring', stiffness: 120 }} className="p-5 rounded-t-lg bg-white w-full m-96 h-128">
                <div className=" font-platy text-5xl text-center">Transaction Details</div>
                <div className="mt-5 text-center p-2 font-platy">
                    <div className="mt-2 text-black p-2">Transaction Gas: {gas}</div>
                    <div className="mt-2 text-black p-2">Transaction Gas Price: {gasPrice} </div>
                    <div className="mt-2 text-black p-2">Transaction Total Price: {totalCost} </div>
                    <div className="mt-2 text-black p-2">Transaction Status: {status}</div>
                    {trueanimation && <LockAnimation />}
                </div>
                <div className="mt-6 justify-items-center flex justify-center">
                <motion.button whileHover={{scale:1.1}} onClick ={onClose} className="bg-indigo-800  h-8 w-16 font-primaryMedium hover:bg-blue-700 text-white  rounded-full flex items-center justify-items-center pl-2">Close</motion.button>

                </div>
                
               
            </motion.div>
        </div>
    );
}
