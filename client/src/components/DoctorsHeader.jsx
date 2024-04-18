import { motion } from "framer-motion";

export default function DoctorsHeader({doctorHandle, onView, onRecordView})
{
    return(
        <>
        <motion.div initial={{y:'-50vw'}} animate ={{y:0}} transition={{duration:1.5, type:'spring', stiffness: 40}} className="flex justify-between items-center mx-auto">
        <div  className="text-white font-platy text-6xl ml-5">MedSecure</div>
        <div>
        <ul className="flex items-center gap-[2vw] text-white font-primaryRegular mt-10 mr-20">
                <li className="mr-3"><motion.button  onClick={doctorHandle} whileHover={{scale:1.2, originX:0}} className="hover:text-sky-500">Add EHR</motion.button></li>
                <li><motion.button onClick = {onRecordView} whileHover={{scale:1.2}} className="hover:text-sky-500">View Medical Records</motion.button></li>
                <li className="ml-3"><motion.button onClick = {onView} whileHover={{scale:1.2, originX:0}} className="hover:text-sky-500">View Doctors</motion.button></li>
        </ul>
        </div>
        {/* <div className=" flex items-center gap-[1vw] mr-5">
            <button onClick = {onHandle} className="bg-indigo-800 font-primaryMedium hover:bg-blue-700 text-white px-5 py-2 rounded-full">Log in</button>
            <button onClick={onSign} className="bg-indigo-800 font-primaryMedium hover:bg-blue-700 text-white px-5 py-2 rounded-full">Sign up</button>
            </div> */}
            </motion.div>
        </>
    );

}