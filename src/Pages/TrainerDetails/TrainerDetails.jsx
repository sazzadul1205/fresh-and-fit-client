import { Link, useLoaderData } from "react-router-dom";
import Title from "../Shared/PageTitles/Title";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Orbitals } from "react-spinners-css";

const TrainerDetails = () => {
    const axiosSecure = useAxiosSecure();
    const {
        _id,
        fullName,
        email,
        age,
        profileImage,
        experience,
        socialIcons,
        availableSlots,
        skills,
        availableTimeWeek,
        availableTimeDay,
    } = useLoaderData();

    const { data: trainerBookings = [], isLoading: isLoadingTrainerBookings } = useQuery({
        queryKey: ['bookings'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/bookings?trainerEmail=${email}`);
            return res.data;
        }
    });

    if (isLoadingTrainerBookings) {
        return <div className="text-center"><Orbitals color="#FF0000" size={32} /></div>
    }


    const calculateAvailableSlots = () => {
        const slots = Array.from({ length: availableSlots }, (_, index) => ({
            slotNumber: index + 1,
            time: `${index + 1}:00 - ${index + 2}:00`,
            isAvailable:
                availableTimeDay.includes("Everyday") ||
                availableTimeDay.includes(availableTimeWeek[index % 7]),
        }));

        return slots;
    };

    // Extracting bookerName and selectedSlot values
    const bookingsInfo = trainerBookings.map(({ bookerName, selectedSlot }) => ({
        bookerName,
        selectedSlot,
    }));

    return (
        <div className="container mx-auto p-5 pt-20 bg-[#7D7C7C] shadow-lg rounded-lg">
            <Helmet>
                <title>Fresh & Fit || Know More</title>
            </Helmet>
            <div className="text-center">
                <Title
                    title={`Meet Your Fitness Trainer - ${fullName}`}
                    subTitle="Explore the profile, skills, and availability of your dedicated fitness trainer. Get ready to embark on a personalized wellness journey!"
                />
            </div>
            <div className="flex mt-10 gap-14 ml-20">
                <div>
                    <img src={profileImage} alt={`Profile of ${fullName}`} className="w-60 h-60 object-cover rounded-full" />
                </div>
                <div className="text-lg text-black">
                    <h2 className="text-3xl font-bold">{fullName}</h2>
                    <p className="mt-2 text-red-500 text-2xl">Email: {email}</p>
                    <p>Age: {age}</p>
                    <p>Experience: {experience} years</p>
                    <p>Skills: {skills.join(", ")}</p>
                    <p>Available Time in a Week: {availableTimeWeek.join(", ")}</p>
                    <p>Available Time in a Day: {availableTimeDay.join(", ")}</p>

                    <h3 className="mt-4 text-xl font-semibold">Connect with {fullName}</h3>
                    <div className="flex mt-2 gap-5">
                        <Link to={socialIcons.facebook} target="_blank">
                            <FaFacebookF className="text-[#1877F2] text-2xl cursor-pointer" />
                        </Link>
                        <Link to={socialIcons.twitter} target="_blank">
                            <FaTwitter className="text-[#1DA1F2] text-2xl cursor-pointer" />
                        </Link>
                        <Link to={socialIcons.instagram} target="_blank">
                            <FaInstagram className="text-[#fccc63] text-2xl cursor-pointer" />
                        </Link>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="table text-black">
                        <thead>
                            <tr>
                                <th>Slot Number</th>
                                <th>Time</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {calculateAvailableSlots().map((slot) => (
                                <tr key={slot.slotNumber}>
                                    <td>{slot.slotNumber}</td>
                                    <td>{slot.time}</td>
                                    <td>
                                        {bookingsInfo.some((booking) => booking.selectedSlot === slot.slotNumber)
                                            ? <p className="text-md p-3 bg-slate-800 rounded-xl">Unavailable</p>
                                            : <Link to={`/trainerBooking/${_id}`}>
                                                <motion.input
                                                    className={`w-20 p-3 bg-red-500 hover:bg-red-800 rounded-xl`}
                                                    type='submit'
                                                    value={'Book'}
                                                    whileHover={{ scale: 1.2 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                                />
                                            </Link>}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div >
    );
};

export default TrainerDetails;
