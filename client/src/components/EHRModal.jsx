import { motion } from "framer-motion";
import { useState, useRef } from "react";

export default function ModalGetStarted({ onSub, onGet }) {
    const publicRef = useRef();
    const p_nameRef = useRef();
    const conditionRef = useRef();


    function handleSubmit(event) {
        event.preventDefault();

        // Get input values from refs
        const public_add = publicRef.current.value;
        const patient_name = p_nameRef.current.value;
        const condition = conditionRef.current.value;
        

        const senddata = {public_address: public_add, p_name: patient_name, cond: condition}
        // Update state with input values

        // Pass values to parent component
        onGet(senddata);
    }

    return (
        <div className=" fixed inset-0 bg-black opacity-95 backdrop-blur-sm flex justify-center items-center">
            <motion.div initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, type: 'spring', stiffness: 120 }} className="p-5 rounded-t-lg bg-white w-full m-96 ">
                <div className=" font-platy text-5xl text-center">Add a Record</div>
                <div>
                    <form onSubmit={handleSubmit} className="mt-5 flex flex-col justify-center items-center ">
                        <label htmlFor="pub_address" className="font-primaryMedium flex flex-col">
                            Account public address:
                            <input id="pub_address" type="text" ref={publicRef} className="border-2 border-orange-600 rounded-md m-2 p-1 w-96" />
                        </label>
                        <label htmlFor="p_name" className="font-primaryMedium flex flex-col">
                            Patient Name :
                            <input id="p_name" type="text" ref={p_nameRef} className="border-2 border-orange-600 rounded-md m-2 p-1 w-96" />
                        </label>
                        <label htmlFor="condition" className="font-primaryMedium flex flex-col">
                            Condition :
                            <input id="condtion" type="text" ref={conditionRef} className="border-2 border-orange-600 rounded-md m-2 p-1 w-96" />
                        </label>

                        <div className="flex justify-center items-center mt-5 ">
                            <motion.button whileHover={{ scale: 1.1 }} className="bg-indigo-800 h-8 p-2 font-primaryMedium hover:bg-blue-700 text-white  rounded-full flex items-center justify-items-center ">Add</motion.button>
                            <motion.button whileHover={{ scale: 1.1 }} onClick={onSub} className="bg-indigo-800  h-8 w-16 font-primaryMedium hover:bg-blue-700 text-white  rounded-full flex items-center justify-items-center pl-2 ml-2">Close</motion.button>
                        </div>
                    </form>
                </div>
            </motion.div>
        </div>
    );
}
