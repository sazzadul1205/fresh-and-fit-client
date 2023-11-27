import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Title from "../../../Pages/Shared/PageTitles/Title";

const ActivityLog = () => {
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();

    const { data: myTrainers = [], isLoading: isLoadingMyBookings } =
        useQuery({
            queryKey: ["bookings"],
            queryFn: async () => {
                const res = await axiosPublic.get(
                    `/bookings?bookerEmail=${user.email}`
                );
                return res.data;
            },
        });

    if (isLoadingMyBookings) {
        return <p>Loading...</p>;
    }
    console.log(myTrainers);

    const calculateAvailableSlots = () => {
        const slots = Array.from({ length: 12 }, (_, index) => {
            const slotNumber = index + 1;
            const time = `${index + 1}:00 - ${index + 2}:00`;

            // Find the trainer for the current slot
            const trainerForSlot = myTrainers.find(
                (trainer) => trainer.selectedSlot === slotNumber
            );

            return {
                slotNumber,
                time,
                trainer: trainerForSlot ? trainerForSlot.trainer : "",
            };
        });
        return slots;
    };

    return (
        <div>
            <div>
                <Title
                    title="Activity Log"
                    subTitle="View your today's activity including your current trainer and training time."
                />
            </div>
            <div>
                <h1 className="text-center text-2xl font-semibold text-red-700 mb-5">
                    Your Trainers:{" "}
                </h1>
                <table className="table-auto mx-auto w-[800px] text-black bg-gray-800">
                    <thead>
                        <tr className="bg-red-500">
                            <th className="px-4 py-2">ID</th>
                            <th className="px-4 py-2">Trainer Name</th>
                            <th className="px-4 py-2">Trainer Email</th>
                            <th className="px-4 py-2">Plan</th>
                        </tr>
                    </thead>
                    <tbody>
                        {myTrainers.map((trainer, index) => (
                            <tr key={trainer._id} className="text-xl mb-3">
                                <td>{index + 1}</td>
                                <td>{trainer.trainer}</td>
                                <td>{trainer.trainerEmail}</td>
                                <td>{trainer.selectedPlan}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div>
                <h1 className="text-center text-2xl font-semibold text-red-700 mb-5 mt-10">
                    Your Routine:{" "}
                </h1>
                <table className="table text-black mx-auto w-[800px] bg-gray-800">
                    <thead className="bg-red-500 text-black">
                        <tr>
                            <th>Slot Number</th>
                            <th>Time</th>
                            <th>Trainer</th>
                        </tr>
                    </thead>
                    <tbody>
                        {calculateAvailableSlots().map((slot) => (
                            <tr key={slot.slotNumber}>
                                <td>{slot.slotNumber}</td>
                                <td>{slot.time}</td>
                                <td className="text-2xl">{slot.trainer}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ActivityLog;
