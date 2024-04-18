import { motion } from "framer-motion";
import { useState, useEffect } from "react";
export default function ModalGetStarted({onModal, onFormReceived})
{
    const[Values, setValues] = useState(
        {
            id: 1,
            public_add:'',
            first_name:'',
            last_name:''
        }
    )

    function handleInputChange(identifier, value)
    {
        setValues( prevValues =>({
            ...prevValues,
            [identifier]:value,
        }))
        
    }
    // // useEffect(() => {
    // //     onAddressReceived(address); // Call the callback whenever address changes
    // //   }, [address]);
    
    //   function handleInputChange(identifier, value) {
    //     setValues(prevValues => ({
    //       ...prevValues,
    //       [identifier]: value
    //     }));
    //     setaddress(value); // Update address immediately
    //   }
    function handleSubmit(event)
    {
        event.preventDefault();
        console.log(Values);
        onFormReceived(Values);
        setValues(prevValues => ({
            ...prevValues,
            id: prevValues.id + 1
        }));
        
        
    }
    return(
        <div className=" fixed inset-0 bg-black opacity-95 backdrop-blur-sm flex justify-center items-center">
            <motion.div initial={{opacity:0,y:-100}} animate={{opacity:1,y:0}} transition={{duration:1, type:'spring', stiffness:120}} className="p-5 rounded-t-lg bg-white w-full m-96 ">
            <div className=" font-platy text-5xl text-center">Add a Doctor</div>
            <div>
                <form onSubmit={handleSubmit} className="mt-5 flex flex-col justify-center items-center ">
                    <label htmlFor= "name" className="font-primaryMedium flex flex-col">
                        Account public address:  
                        <input id = "name" type="text" onChange={(event) => handleInputChange('public_add',event.target.value)} value = {Values.txn} className="border-2 border-orange-600 rounded-md m-2 p-1 w-96"/>
                    </label>
                    <label htmlFor="gfee" className="font-primaryMedium flex flex-col">
                         First Name :  
                        <input id = "gfee" type="text" onChange={(event) => handleInputChange('first_name',event.target.value)} value = {Values.gfees} className="border-2 border-orange-600 rounded-md m-2 p-1 w-96"/>
                    </label>
                    <label htmlFor="p-bhash" className="font-primaryMedium flex flex-col">
                        Last Name : 
                        <input id= "p-bhash" type ="text" onChange={(event) => handleInputChange('last_name',event.target.value)} value = {Values.p_bh} className="border-2 border-orange-600 rounded-md m-2 p-1 w-96"/>
                    </label>
                    
                    <div className="flex justify-center items-center mt-5 ">
                <motion.button whileHover={{scale:1.1}} className="bg-indigo-800 h-8 p-2 font-primaryMedium hover:bg-blue-700 text-white  rounded-full flex items-center justify-items-center ">Add</motion.button>
                <motion.button whileHover={{scale:1.1}} onClick ={onModal} className="bg-indigo-800  h-8 w-16 font-primaryMedium hover:bg-blue-700 text-white  rounded-full flex items-center justify-items-center pl-2 ml-2">Close</motion.button>
                </div>
                </form>

                
            </div>
            

            </motion.div>
            
        </div>
        
    );
}