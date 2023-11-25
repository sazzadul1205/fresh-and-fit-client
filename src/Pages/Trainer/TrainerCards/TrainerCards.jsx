import { motion } from "framer-motion";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

const TrainerCard = ({ trainer }) => {
    const { _id, name, profileImage, experience, socialIcons, availableSlots } = trainer;
    const { facebook, instagram, twitter } = socialIcons;

    return (<>
        <div className="card w-96 bg-red-500 text-white shadow-xl">
            <figure className="px-10 pt-10">
                <img src={profileImage} alt={name} className="rounded-xl" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p>{`Years of Experience: ${experience}`}</p>
                <p>{`Available Slots: ${availableSlots} hours per day`}</p>
                <p className="text-xl">Socials:</p>
                <div className="flex gap-4 text-3xl">

                    <Link to={facebook}>
                        <FaFacebookF className="text-[#1877F2]"></FaFacebookF>
                    </Link>
                    <Link to={twitter}>
                        <FaTwitter className="text-[#1DA1F2]"></FaTwitter>
                    </Link>
                    <Link to={instagram}>
                        <FaInstagram className="text-[#fccc63]"></FaInstagram>
                    </Link>
                </div>
                <div className="card ">
                    <Link to={`/trainer/${_id}`}>
                        <motion.input
                            className={`w-full p-3 bg-purple-500 hover:bg-red-800 disabled:bg-gray-500 rounded-xl`}
                            type='submit'
                            value={'Know more'}
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        />
                    </Link>
                </div>
            </div>
        </div>
    </>
    );
};

export default TrainerCard;
