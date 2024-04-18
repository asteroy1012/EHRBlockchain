// import { motion } from "framer-motion";
// import { useEffect } from "react";
// export default function EhrRecords({forwardData})
// {
    
//     const listAuthorize = forwardData;



//     return(
//         <motion.div initial={{x:'-100vw'}} animate ={{x:0}} transition={{duration:1.5, type:'spring', stiffness: 40, delay:1}} className="bg-black text-white mt-10">
//             <h2 className="text-2xl font-bold mb-4 p-2 font-platy">Medical Records</h2>
//             <div className="overflow-x-auto">
//                 <table className="min-w-full divide-y divide-gray-200">
//                     <thead className="bg-gray-50">
//                         <tr>
//                             <th scope="col" className="px-6 py-3 text-left text-xs font-platy text-gray-500 uppercase tracking-wider">Public Address</th>
//                             <th scope="col" className="px-6 py-3 text-left text-xs font-platy text-gray-500 uppercase tracking-wider">Patient Name</th>
//                             <th scope="col" className="px-6 py-3 text-left text-xs font-platy text-gray-500 uppercase tracking-wider">Condition</th>
//                         </tr>
//                     </thead>
//                     <tbody className="bg-white divide-y divide-gray-200">
//                         {listAuthorize.map((user) => (
//                             <tr key = {giveId}>
//                                 <td className="px-6 py-4 whitespace-nowrap text-black font-platy">{user.provider}</td>
//                                 <td className="px-6 py-4 whitespace-nowrap text-black font-platy">{user.name}</td>
//                                 <td className="px-6 py-4 whitespace-nowrap text-black font-platy">{user.condition}</td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </motion.div>
//     );
// }

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function EhrRecords({ forwardData }) {
    const [listAuthorize, setListAuthorize] = useState([]);
    console.log(forwardData)
    useEffect(() => {
        // Assign incremental IDs to each record in the data
        const dataWithIds = forwardData.map((record, index) => ({
            ...record,
            id: index + 1, // Incremental ID starting from 1
        }));
        setListAuthorize(dataWithIds);
    }, [forwardData]);

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
                        {listAuthorize.map((user) => (
                            <tr key={user.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-black font-platy">{user.public_address}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-black font-platy">{user.p_name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-black font-platy">{user.cond}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </motion.div>
    );
}
