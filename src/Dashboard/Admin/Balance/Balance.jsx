import { useQuery } from "@tanstack/react-query";
import { MdOutlinePayment } from "react-icons/md";
import { FaBalanceScale } from "react-icons/fa";
import BalanceChart from "./BalanceChart";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Title from "../../../Pages/Shared/PageTitles/Title";
import { Helmet } from "react-helmet-async";


const Balance = () => {
    const axiosPublic = useAxiosPublic();

    // Call bookings
    const { data: adminBalances = [], isLoading: isLoadingAdminBalances } = useQuery({
        queryKey: ["adminBalances"],
        queryFn: async () => {
            const res = await axiosPublic.get(`/adminBalances`);
            return res.data;
        },
    });

    const { data: bookings = [], isLoading: isLoadingBookings } = useQuery({
        queryKey: ["bookings"],
        queryFn: async () => {
            const res = await axiosPublic.get(`/bookings`);
            return res.data;
        },
    });

    // Check if any of the queries are still loading
    const isLoading = isLoadingAdminBalances || isLoadingBookings;
    if (isLoading) {
        return <p>Loading ... </p>;
    }

    return (
        <div>
            <div>
                <Helmet>
                    <title>Fresh & Fit || Balance</title>
                </Helmet>
                <Title title={"Balance"}></Title>
            </div>
            <div className="flex flex-col md:flex-row gap-5 ml-28">
                <div className="card w-96 bg-primary text-primary-content">
                    <div className="card-body flex flex-row gap-10 bg-red-500 rounded-2xl">
                        <FaBalanceScale className="text-5xl text-[#FFD700]"></FaBalanceScale>
                        <div>
                            <h1 className="text-2xl font-semibold text-green-500 text-center">
                                Balance
                            </h1>
                            <p className="text-xl text-red-200 text-center">
                                {adminBalances.FullBalance}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="card w-96 bg-primary text-primary-content">
                    <div className="card-body flex flex-row gap-10 bg-red-500 rounded-2xl">
                        <MdOutlinePayment className="text-5xl text-[#FFD700]"></MdOutlinePayment>
                        <div>
                            <h1 className="text-2xl font-semibold text-green-500 text-center">
                                Payed Amount
                            </h1>
                            <p className="text-xl text-red-200 text-center">
                                {adminBalances.trainerPayedAmount}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <h1 className="text-3xl mt-10 text-center text-red-500">
                Total Payed User vs Subscribers
            </h1>
            <div className="mx-auto">
                <BalanceChart></BalanceChart>
            </div>
            <h1 className="text-3xl mt-10 text-center text-red-500">
                Total Payments
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5 ml-5 ">
                {bookings.map((booking) => (
                    <div key={booking._id} className="card shadow-xl bg-red-500 text-white">
                        <div className="card-body">
                            <h2 className="card-title">{booking.trainer}</h2>
                            <p>{`Booker: ${booking.bookerName}`}</p>
                            <p>{`Email: ${booking.bookerEmail}`}</p>
                            <p>{`Plan: ${booking.selectedPlan}`}</p>
                            <p>{`Slot: ${booking.selectedSlot}`}</p>
                            <p>{`Price: ${booking.price}`}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Balance;
