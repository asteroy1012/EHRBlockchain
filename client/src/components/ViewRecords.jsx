import { motion } from "framer-motion";

export default function ViewRecords({getData})
{
    
    const listAuthorize = getData;

    return(
        <motion.div initial={{x:'-100vw'}} animate ={{x:0}} transition={{duration:1.5, type:'spring', stiffness: 40, delay:1}} className="bg-black text-white mt-10">
            <h2 className="text-2xl font-bold mb-4 p-2 font-platy">Authorized Doctors</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-platy text-gray-500 uppercase tracking-wider">First Name</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-platy text-gray-500 uppercase tracking-wider">Last Name</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-platy text-gray-500 uppercase tracking-wider">Public Address</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {listAuthorize.map((user) => (
                            <tr key={user.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-black font-platy">{user.first_name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-black font-platy">{user.last_name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-black font-platy">{user.public_add}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </motion.div>
    );
}