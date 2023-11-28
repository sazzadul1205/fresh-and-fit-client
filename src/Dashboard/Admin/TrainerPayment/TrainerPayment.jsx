import { useLoaderData, useNavigate } from "react-router-dom";
import Title from "../../../Pages/Shared/PageTitles/Title";
import { motion } from "framer-motion";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const TrainerPayment = () => {
    const navigate = useNavigate()
    const { _id, email, fullName, joinedDate } = useLoaderData();
    const axiosPublic = useAxiosPublic();
    const currentDate = new Date();
    const formattedDateTime = currentDate.toLocaleString('en-US', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour12: true,
    });

    // Convert joinedDate to a Date object
    const joinedDateObj = new Date(joinedDate);

    // Calculate the number of months between joinedDate and currentDate
    const diffMonths = (currentDate.getFullYear() - joinedDateObj.getFullYear()) * 12 +
        currentDate.getMonth() - joinedDateObj.getMonth();

    // Monthly payment
    const monthlyPayment = 1000;

    // Total payment
    const totalPayment = diffMonths * monthlyPayment;

    const handlePayed = () => {
        const trainerPaymentInfo = {
            trainerEmail: email,
            paymentAmount: totalPayment,
            paymentDate: formattedDateTime,
            monthsPayed: diffMonths,
        };

        axiosPublic
            .patch(`/trainers/${_id}`)
            .then((res) => {
                if (res.data.modifiedCount > 0) {
                    axiosPublic
                        .post('/payed', trainerPaymentInfo)
                        .then((res) => {
                            if (res.data.insertedId) {
                                showSuccessAlert();
                                navigate('/dashboard/allTrainers');
                            }
                        })
                        .catch((error) => {
                            console.log(error);
                            showErrorAlert('Failed to update user profile.');
                        });
                } else {
                    showErrorAlert('Failed to update user profile.');
                }
            })
            .catch((error) => {
                showErrorAlert('Failed to update user profile.');
                console.error('Error updating user role:', error);
            });
    };

    const showSuccessAlert = () => {
        // Show success notification
        Swal.fire({
            icon: 'success',
            title: `Payment Successful!`,
            text: `Payment for ${fullName} processed successfully.`,
        });
    };

    const showErrorAlert = (errorMessage) => {
        // Show error notification
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: errorMessage || 'Failed to update user role.',
        });
    };

    return (
        <div>
            <Helmet>
                <title>Fresh & Fit || Trainers Payment</title>
            </Helmet>
            <Title title={`Trainer Payment - ${fullName}`} />
            <div>
                <div className="card w-96 bg-red-500 shadow-xl mx-auto">
                    <div className="card-body text-white">
                        <h2 className="card-title">{fullName}</h2>
                        <p>Email: {email}</p>
                        <p>Joined Date: {joinedDateObj.toLocaleDateString()}</p>
                        <p>Number of Months: {diffMonths}</p>
                        <p>Total Payment: ${totalPayment}</p>
                        <div className="card-actions justify-end mt-10">
                            <motion.input
                                className={`w-full p-2 bg-purple-500 hover:bg-red-800 disabled:bg-gray-500 rounded-xl`}
                                type="submit"
                                value="Pay"
                                onClick={handlePayed}
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.9 }}
                                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrainerPayment;
