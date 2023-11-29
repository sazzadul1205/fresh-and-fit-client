import { useQuery } from "@tanstack/react-query";
import Title from "../../../Pages/Shared/PageTitles/Title";
import { Helmet } from "react-helmet-async";
import { Orbitals } from "react-spinners-css";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import { motion } from "framer-motion";
import Swal from "sweetalert2";


const RecClassesPage = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const currentDate = new Date();
    const formattedDateTime = currentDate.toLocaleString('en-US', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    });

    const { data: classes = [], isLoading: isLoadingRecClasses } = useQuery({
        queryKey: ['classes'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/classes`);
            return res.data;
        },
    });

    if (isLoadingRecClasses) {
        return <div className="text-center"><Orbitals color="#FF0000" size={32} /></div>
    }

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

                axiosSecure
                    .post('/classesJoined', info)
                    .then((res) => {
                        if (res.data.insertedId) {
                            showSuccessAlert();
                            const updatedMemberCount = memberCount + 1;
                            axiosSecure
                                .patch(`/classes/${classId}`, { memberCount: updatedMemberCount })
                                .then(() => {

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

    // Randomly select 6 classes
    const randomClasses = classes.sort(() => 0.5 - Math.random()).slice(0, 6);

    return (
        <div>
            <Helmet>
                <title>Fresh & Fit || Rec Classes</title>
            </Helmet>
            <div>
                <Title
                    title="Recommended Classes"
                ></Title>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mx-10">
                {randomClasses.map((classItem) => (
                    <div key={classItem.id} className="bg-gray-700 text-white p-4 rounded-md shadow-md">
                        <h3 className="text-xl font-semibold mb-2">{classItem.className}</h3>
                        <p className="">{classItem.classDescription}</p>
                        <p className="text-red-600">
                            Members: {classItem.memberCount}
                        </p>
                        <p className="mb-4">
                            Time: {classItem.classTime}
                        </p>
                        {user ? (
                            <motion.input
                                className={`w-1/2 text-center p-3 bg-blue-500 hover:bg-blue-800 rounded-xl`}
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
    );
};

export default RecClassesPage;
