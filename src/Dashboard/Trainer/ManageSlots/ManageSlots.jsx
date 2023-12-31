import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import Title from "../../../Pages/Shared/PageTitles/Title";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Orbitals } from "react-spinners-css";

const ManageSlots = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: trainerData = [], isLoading: isLoadingTrainerData } = useQuery({
        queryKey: ['trainer'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/trainers?email=${user.email}`);
            return res.data;
        }
    });

    const { data: trainerBookings = [], isLoading: isLoadingTrainerBookings } = useQuery({
        queryKey: ['bookings'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/bookings?trainerEmail=${user.email}`);
            return res.data;
        }
    });

    if (isLoadingTrainerData || isLoadingTrainerBookings) {
        return <div className="text-center"><Orbitals color="#FF0000" size={32}/></div>
    }

    const { availableSlots, availableTimeWeek, availableTimeDay } = trainerData;

    const calculateAvailableSlots = () => {
        const slots = Array.from({ length: availableSlots }, (_, index) => ({
            slotNumber: index + 1,
            time: `${index + 1}:00 - ${index + 2}:00`,
            isAvailable: availableTimeDay.includes("Everyday") || availableTimeDay.includes(availableTimeWeek[index % 7]),
        }));
        return slots;
    };

    // Extracting bookerName and selectedSlot values
    const bookingsInfo = trainerBookings.map(({ bookerName, selectedSlot }) => ({
        bookerName,
        selectedSlot,
    }));

    return (
        <div>
            <Helmet>
                <title>Fresh & Fit || Manage Slots</title>
            </Helmet>
            <div>
                <Title title="Manage Your Slots"></Title>
            </div>
            <div className="overflow-x-auto mx-20">
                <table className="table text-black bg-gray-700">
                    <thead>
                        <tr className="bg-red-500 text-white">
                            <th>Slot Number</th>
                            <th>Time</th>
                            <th>Status</th>
                            <th>Booked By</th>
                        </tr>
                    </thead>
                    <tbody>
                        {calculateAvailableSlots().map((slot) => (
                            <tr key={slot.slotNumber}>
                                <td>{slot.slotNumber}</td>
                                <td>{slot.time}</td>
                                <td className="text-xl">
                                    {bookingsInfo.some((booking) => booking.selectedSlot === slot.slotNumber)
                                        ? "Booked"
                                        : "Unbooked"}
                                </td>
                                <td className="text-xl">
                                    {bookingsInfo
                                        .filter((booking) => booking.selectedSlot === slot.slotNumber)
                                        .map((booking) => (
                                            <div key={booking.selectedSlot}>
                                                {booking.bookerName}
                                            </div>
                                        ))}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageSlots;
