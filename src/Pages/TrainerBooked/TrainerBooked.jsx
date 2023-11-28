import { Link, useLoaderData } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import Title from "../Shared/PageTitles/Title";
import useAuth from "../../Hooks/useAuth";
import { Helmet } from "react-helmet-async";
import { Orbitals } from "react-spinners-css";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const TrainerBooked = () => {
    const { user } = useAuth()
    const { _id, email, fullName, availableSlots, availableTimeWeek, availableTimeDay } = useLoaderData();
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const axiosSecure = useAxiosSecure();

    const plans = [
        { id: 1, name: 'Silver', classes: 5, facilities: 'Basic Facilities', color: 'bg-[#c0c0c0]', price: 20 },
        { id: 2, name: 'Gold', classes: 10, facilities: 'Advanced Facilities', color: 'bg-[#D4AF37]', price: 50 },
        { id: 3, name: 'Diamond', classes: 15, facilities: 'Premium Facilities', color: 'bg-[#ADD8E6]', price: 100 },
    ];

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
            isAvailable: availableTimeDay.includes("Everyday") || availableTimeDay.includes(availableTimeWeek[index % 7]),
        }));
        return slots;
    };

    const bookingsInfo = trainerBookings.map(({ bookerName, selectedSlot }) => ({
        bookerName,
        selectedSlot,
    }));

    const handlePlanSelection = (plan) => {
        setSelectedPlan(plan);
    };

    const handleBookSlot = (slotNumber) => {
        setSelectedSlot(slotNumber);
    };


    const handleBookNow = () => {
        const bookingInfo = {
            trainerId: _id,
            trainer: fullName,
            bookerName: user.displayName,
            bookerEmail: user.email,
            trainerEmail: email,
            selectedPlan: selectedPlan.name,
            selectedSlot: selectedSlot,
            price: selectedPlan.price,
        };
        localStorage.setItem('bookingInfo', JSON.stringify(bookingInfo));
    };

    return (
        <div className="container mx-auto p-5 pt-20  shadow-lg rounded-lg">
            <Helmet>
                <title>Fresh & Fit || Trainer Booking</title>
            </Helmet>
            <div className="text-center">
                <Title
                    title={'Choose Your Wellness Path'}
                    subTitle={"Congratulations! You've booked a slot with your dedicated fitness trainer. Now, select a plan that aligns with your fitness goals and enjoy a personalized journey to a healthier you."}
                ></Title>
            </div>
            <div className="flex mt-20 gap-14 ml-20 ">
                <div>
                    <h3 className="text-2xl font-semibold mb-4">Trainer Slot Booked!</h3>
                    <p>You have successfully booked a slot with the trainer. Now, choose a plan to continue.</p>
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
                                    <tr key={slot.slotNumber} className="text-white">
                                        <td className="text-2xl text-red-500">{slot.slotNumber}</td>
                                        <td>{slot.time}</td>
                                        <td>
                                            {bookingsInfo.some((booking) => booking.selectedSlot === slot.slotNumber)
                                                ? <p className="text-md p-3 bg-slate-800 rounded-xl">Unavailable</p>
                                                : <Link to={`/trainerBooking/${_id}`}>
                                                    <motion.input
                                                        className={`w-20 p-3 bg-red-500 hover:bg-red-800 rounded-xl`}
                                                        type='submit'
                                                        value={'Book'}
                                                        onClick={() => handleBookSlot(slot.slotNumber)}
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
                <div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {plans.map((plan) => (
                            <div key={plan.id} className={`border p-4 text-black ${plan.color} ${selectedPlan === plan ? 'border-blue-500' : 'border-gray-300'} cursor-pointer`}>
                                <h3 className="text-xl font-semibold">{plan.name}</h3>
                                <p>{`${plan.classes} classes included`}</p>
                                <p>{`Facilities: ${plan.facilities}`}</p>
                                <p>{`Price: $ ${plan.price}`}</p>
                                <motion.button
                                    className={`w-full p-3 bg-blue-500 hover:bg-blue-800 rounded-xl ${selectedPlan === plan && 'border-b-4 border-blue-500'}`}
                                    onClick={() => handlePlanSelection(plan)}
                                >
                                    Select Plan
                                </motion.button>
                            </div>
                        ))}
                    </div>
                    {selectedSlot && <h1 className="text-2xl mt-5">Selected Slot: {selectedSlot}</h1>}
                    {selectedPlan && <h1 className="text-2xl mt-5">Selected Slot: {selectedPlan.name}</h1>}
                </div>
            </div>
            <div className="flex justify-end mt-6 text-white">
                <Link to={'/payment'}>
                    <motion.button
                        className={`w-60 p-3 bg-green-500 hover:bg-green-800 rounded-xl ${selectedPlan ? '' : 'cursor-not-allowed'}`}
                        onClick={handleBookNow}
                        disabled={!selectedPlan}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                        Join Now
                    </motion.button>
                </Link>
            </div>
        </div>
    );
};

export default TrainerBooked;
