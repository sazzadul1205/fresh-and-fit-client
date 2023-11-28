import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import Title from "../../../Pages/Shared/PageTitles/Title";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Orbitals } from "react-spinners-css";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";


const ManageMember = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: trainerBookings = [], isLoading: isLoadingTrainerBookings } =
        useQuery({
            queryKey: ["bookings"],
            queryFn: async () => {
                const res = await axiosSecure.get(
                    `/bookings?trainerEmail=${user.email}`
                );
                return res.data;
            },
        });

    if (isLoadingTrainerBookings) {
        return <div className="text-center"><Orbitals color="#FF0000" size={32}/></div>
    }


    return (
        <div>
            <Helmet>
                <title>Fresh & Fit || Manage Members</title>
            </Helmet>
            <div>
                <Title
                    title="Manage Members"
                    subTitle="View and manage your members in a tabular format."
                />
            </div>
            <div className="overflow-x-auto mx-5">
                <table className="table text-black bg-gray-700">
                    <thead>
                        <tr className="bg-red-500 text-white text-center">
                            <th>Booker Name</th>
                            <th>Email</th>
                            <th>Selected Plan</th>
                            <th>Selected Slot</th>
                            <th>Price</th>
                            <th>Action</th>
                            <th>Reject</th>
                        </tr>
                    </thead>
                    <tbody>
                        {trainerBookings.map((member) => (
                            <tr key={member._id} className="text-center">
                                <td>{member.bookerName}</td>
                                <td>{member.bookerEmail}</td>
                                <td>{member.selectedPlan}</td>
                                <td>{member.selectedSlot}</td>
                                <td>{member.price}</td>
                                <td>
                                    <Link to={`/dashboard/sendInstruction/${member._id}`}>
                                        <motion.input
                                            className={`w-32 p-3 bg-green-500 hover:bg-green-800  rounded-xl text-center`}
                                            type="submit"
                                            value="Send Instruction"
                                            whileHover={{ scale: 1.2 }}
                                            whileTap={{ scale: 0.9 }}
                                            transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                        />
                                    </Link>
                                </td>
                                <td>
                                    <Link to={`/dashboard/memberRejection/${member._id}`}>
                                        <motion.input
                                            className={`w-24 p-3 bg-red-500 hover:bg-red-800  rounded-xl`}
                                            type="submit"
                                            value="Reject"
                                            whileHover={{ scale: 1.2 }}
                                            whileTap={{ scale: 0.9 }}
                                            transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                        />
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageMember;
