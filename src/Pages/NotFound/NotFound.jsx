import { Link } from "react-router-dom";
import NF from "../../assets/NFPage.png"
import { motion } from "framer-motion";

const NotFound = () => {
    return (
        <div className="bg-white">
            <img className="mx-auto fixed pt-10 pb-80" src={NF} alt="" />
            <div className="relative left-[850px] top-[700px]">
                <Link to={'/'}>
                    <motion.input
                        className={`w-52 p-3 bg-red-500 hover:bg-red-800  rounded-xl text-black font-bold text-2xl`}
                        type='submit'
                        value={'Go Home'}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    />
                </Link>
            </div>
        </div>
    );
};

export default NotFound;