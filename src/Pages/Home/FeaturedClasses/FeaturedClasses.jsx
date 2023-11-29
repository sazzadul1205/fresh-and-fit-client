import { useQuery } from "@tanstack/react-query";
import Title from "../../Shared/PageTitles/Title";
import { motion } from "framer-motion";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { Orbitals } from 'react-spinners-css';
import useAuth from "../../../Hooks/useAuth";

const FeaturedClasses = () => {
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();

    const { data: classes = [], isLoading, refetch } = useQuery({
        queryKey: ['classes'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/classes`);
            return res.data;
        }
    });

    if (isLoading) {
        return <div className="text-center"><Orbitals color="#FF0000" size={32} /></div>
    }

    // Sort classes based on member count in descending order
    const sortedClasses = [...classes].sort((a, b) => b.memberCount - a.memberCount);

    const currentDate = new Date();
    const formattedDateTime = currentDate.toLocaleString('en-US', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    });

    const handleCardClick = (classId, className, trainerName, memberCount) => {
        Swal.fire({
            title: 'Join Class?',
            text: `Do you want to join the class "${className}"?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, join!',
            cancelButtonText: 'No, cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                const info = {
                    className: className,
                    trainerName: trainerName,
                    email: user.email,
                    classId: classId,
                    classTime: classes.classTime,
                    Submitted: formattedDateTime,
                };

                console.log('User clicked Join!', info);

                axiosPublic
                    .post('/classesJoined', info)
                    .then((res) => {
                        if (res.data.insertedId) {
                            showSuccessAlert();
                            const updatedMemberCount = memberCount + 1;
                            axiosPublic
                                .patch(`/classes/${classId}`, updatedMemberCount)
                                .then(() => {
                                    refetch();
                                })
                                .catch((error) => {
                                    console.log(error);
                                    showErrorAlert('Failed to update member count.');
                                });
                        }
                    })
                    .catch((error) => {
                        console.error(error);
                        showErrorAlert('Failed to create a new class.');
                    });
            }
        });
    };

    const showSuccessAlert = () => {
        Swal.fire({
            icon: 'success',
            title: 'Class Joined!',
            text: 'You have successfully joined the fitness class.',
            confirmButtonText: 'OK',
        });
    };

    const showErrorAlert = (errorMessage) => {
        Swal.fire({
            icon: 'error',
            title: 'Joining Class Failed',
            text: errorMessage,
            confirmButtonText: 'OK',
        });
    };

    const displayedClasses = sortedClasses.slice(0, 6);

    return (
        <>
            <Title title="Our Featured Classes" />
            <section className="py-16">
                <div className="container mx-auto">
                    <h2 className="text-3xl font-bold mb-8">✨ Featured Classes</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {displayedClasses.map((classItem) => (
                            <div key={classItem.id} className="bg-red-500 text-white p-4 rounded-md shadow-md">
                                <h3 className="text-xl font-semibold mb-2">{classItem.className}</h3>
                                <p className="">{classItem.classDescription}</p>
                                <p className="text-gray-600 mb-4">
                                    Members: {classItem.memberCount}
                                </p>
                                {user ? (
                                    <motion.input
                                        className={`w-1/3 text-center p-3 bg-blue-500 hover:bg-blue-800 rounded-xl`}
                                        type="submit"
                                        onClick={() => handleCardClick(classItem._id, classItem.className, classItem.trainerName, classItem.memberCount)}
                                        value="Join Now"
                                        whileHover={{ scale: 1.2 }}
                                        whileTap={{ scale: 0.9 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                    />
                                ) : (
                                    <h1 className={`w-2/3 text-center p-3 bg-gray-800 rounded-xl`}>Login To Join</h1>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default FeaturedClasses;
