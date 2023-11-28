import { useQuery } from "@tanstack/react-query";
import Title from "../../../Pages/Shared/PageTitles/Title";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Orbitals } from "react-spinners-css";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const AllTrainers = () => {
    const axiosSecure = useAxiosSecure();

    const { data: trainers = [], isLoading } = useQuery({
        queryKey: ['trainers'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/trainers`);
            return res.data;
        }
    });

    if (isLoading) {
        return <div className="text-center"><Orbitals color="#FF0000" size={32}/></div>
    }

    return (
        <div>
            <Helmet>
                <title>Fresh & Fit || All Trainers</title>
            </Helmet>
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
                            <tr key={trainer._id} className="text-xl mb-3 bg-gray-300">
                                <td>{index + 1}</td>
                                <td>{trainer.fullName}</td>
                                <td>{trainer.joinedDate}</td>
                                <td className="text-center flex items-center justify-center">
                                    {trainer.paymentStatus === "pending" ? (
                                        <Link to={`/dashboard/trainerPayment/${trainer._id}`}>
                                            <motion.input
                                                className={`w-40 p-2  bg-red-500 hover:bg-red-800 rounded-xl`}
                                                type="submit"
                                                value="Pay"
                                                whileHover={{ scale: 1.2 }}
                                                whileTap={{ scale: 0.9 }}
                                                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                            />
                                        </Link>
                                    ) : (
                                        <h1 className="w-40 text-black bg-gray-500 rounded-xl p-2">Paid</h1>
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
