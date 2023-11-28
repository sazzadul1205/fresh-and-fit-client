import { useQuery } from "@tanstack/react-query";
import Title from "../../Shared/PageTitles/Title";
import { motion } from "framer-motion";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const FeaturedClasses = () => {
    const axiosPublic = useAxiosPublic();

    const { data: classes = [] } = useQuery({
        queryKey: ['classes'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/classes`);
            return res.data;
        }
    });

    // Limit the number of displayed classes to a maximum of 6
    const displayedClasses = classes.slice(0, 6);

    return (
        <>
            <Title title="Our Featured Classes" />
            <section className="py-16">
                <div className="container mx-auto">
                    <h2 className="text-3xl font-bold mb-8">✨ Featured Classes</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {displayedClasses.map((classItem) => (
                            <div key={classItem.id} className="bg-white p-4 rounded-md shadow-md">
                                <h3 className="text-xl font-semibold mb-2">{classItem.className}</h3>
                                <p className="">{classItem.classDescription}</p>
                                <p className="text-gray-600 mb-4">
                                    Members: {classItem.memberCount}
                                </p>
                                <motion.input
                                    className={`w-1/3 text-center p-3 bg-blue-500 hover:bg-blue-800 disabled:bg-gray-500 rounded-xl`}
                                    type="submit"
                                    value="Join Now"
                                    whileHover={{ scale: 1.2 }}
                                    whileTap={{ scale: 0.9 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default FeaturedClasses;
