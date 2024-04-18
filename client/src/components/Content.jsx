import Lottie from "lottie-react";
import Cool from '../assets/cool-animation2.json';
import Cool1 from '../assets/cool-animation.json';
import img1 from '../assets/Healthify_transparent.png';
import { motion } from "framer-motion";
import Animation from "./Animation";
export default function Content({onModal})
{
    return(
        <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1, duration:2}}className="flex flex-row mt-10">
            <div className="basis-1/2 font-primaryRegular text-white justify-center items-center p-20 ml-24">
            <img src={img1} alt="logo" className="justify-center align-center h-1/3 w-1/3"/>
            <h1 className="font-black p-2 text-2xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h1>
            <p>Ut ultrices feugiat placerat. Maecenas pellentesque posuere ipsum, eu consectetur nisi accumsan non. In blandit, est a tincidunt efficitur, lorem libero ornare orci, fermentum imperdiet est nulla vitae velit. Aenean non lorem rutrum, molestie felis nec, pharetra justo. In et diam in nibh dignissim mattis. Donec ac sapien pellentesque, vehicula diam non, tempus est. Nullam vel neque ac tellus porttitor euismod.
            </p>
            <motion.button whileHover ={{scale:1.2}} onClick ={onModal} className="bg-indigo-800 mt-5 font-primaryMedium hover:bg-blue-700 text-white px-5 py-2 rounded-full">Add doctor</motion.button>
            
            
            </div>
            
            <div className="basis-1/2 mt-20">
            <Animation />
            
            </div>
        </motion.div>
    );
}