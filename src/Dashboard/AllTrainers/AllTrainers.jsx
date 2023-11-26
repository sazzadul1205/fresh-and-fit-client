import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Title from "../../Pages/Shared/PageTitles/Title";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const AllTrainers = () => {
    const axiosPublic = useAxiosPublic();

    const { data: trainers = [], isLoading } = useQuery({
        queryKey: ['trainers'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/trainers`);
            return res.data;
        }
    });

    if (isLoading) {
        return <p>Loading ...</p>;
    }

    return (
        <div>
            <div>
                <Title
                    title="All Trainers"
                    subTitle="Explore and manage all trainers in a tabular format."
                />
            </div>
            <div>
                <table className="table-auto mx-auto w-[800px]">
                    <thead>
                        <tr className="bg-red-500">
                            <th className="px-4 py-2">ID</th>
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Joined Date</th>
                            <th className="px-4 py-2">Payment Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {trainers.map((trainer, index) => (
                            <tr key={trainer._id} className="text-xl mb-3">
                                <td>{index + 1}</td>
                                <td>{trainer.fullName}</td>
                                <td>{trainer.joinedDate}</td>
                                <td>{trainer.paymentStatus === "pending" ? (
                                    <Link to={`/dashboard/trainerPayment/${trainer._id}`}>
                                        <motion.input
                                            className={`w-full p-2 bg-red-500 hover:bg-red-800 disabled:bg-gray-500 rounded-xl`}
                                            type="submit"
                                            value="Pay"
                                            whileHover={{ scale: 1.2 }}
                                            whileTap={{ scale: 0.9 }}
                                            transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                        />
                                    </Link>
                                ) : (
                                    <h1 className="text-center text-black bg-gray-500 rounded-xl p-2">Paid</h1>
                                )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllTrainers;
