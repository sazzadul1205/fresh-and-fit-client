import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useState } from "react";
import Title from "../../../Pages/Shared/PageTitles/Title";
import emailjs from '@emailjs/browser';
import Swal from "sweetalert2";
import { motion } from 'framer-motion';
import useAxiosSecure from "../../../Hooks/useAxiosSecure";



const MemberReject = () => {
    const { user } = useAuth();
    const { register, handleSubmit } = useForm();
    const { _id, bookerEmail, bookerName } = useLoaderData();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const mail = `I hope this message finds you well. Thank you for considering me as your fitness trainer and for submitting a booking request. I appreciate your interest in working with me.

        After careful consideration, I regret to inform you that I am unable to accept your booking request at this time. Please understand that this decision is not made lightly, and I have carefully reviewed the details of your request.
        
        There could be various reasons for this decision, including scheduling conflicts, capacity limitations, or other professional commitments. I want to ensure that each client receives the attention and dedication they deserve, and unfortunately, I am unable to accommodate your request at this moment.
        
        I understand that this news may be disappointing, and I apologize for any inconvenience this may cause. I value your interest in my services and encourage you to explore other available options for your fitness journey.
        
        If you have any questions or would like further clarification, please feel free to reach out. I am more than happy to provide insights or recommendations that may help you in your fitness endeavors.
        
        Thank you again for considering me as your trainer, and I wish you the very best on your fitness journey.`;

    const showSuccessAlert = () => {
        Swal.fire({
            icon: 'success',
            title: 'Email Sent!',
            text: `The rejection email has been sent successfully to ${bookerName}.`,
        });
    };

    const showErrorAlert = (errorMessage) => {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: errorMessage || 'Failed to send rejection email. Please try again later.',
        });
    };

    const onSubmit = (data) => {
    setIsSubmitting(true);

    const templateParams = {
        from_name: `${user.displayName}`,
        to_name: `${bookerName}`,
        message: `${data.content}`,
        to_email: `${bookerEmail}`,
        from_email: `${user.displayName}`,
    };

    emailjs
        .send('service_793r2nu', 'template_zxjvjc9', templateParams, '2E4m6SmAxA_qFfFN9')
        .then(
            (res) => {
                console.log('SUCCESS!', res.status, res.text);
                return axiosSecure.delete(`/bookings/${_id}`);
            }
        )
        .then(() => {
            showSuccessAlert();
            navigate('/dashboard/manageMember');
        })
        .catch((error) => {
            console.log(error);
            showErrorAlert('Failed to update user profile.');
        })
        .finally(() => {
            setIsSubmitting(false);
        });
};



    return (
        <div>
            <Title title={'Reject Booking'} />
            <div className="card w-full shadow-2xl bg-gray-800 ">
                <form onSubmit={handleSubmit(onSubmit)} className="card-body ">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input
                            type="text"
                            {...register('name', { required: true })}
                            value={bookerName}
                            name="name"
                            placeholder="Your Class Name"
                            className="input input-bordered"
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email Id</span>
                        </label>
                        <input
                            type="email"
                            {...register('email', { required: true })}
                            value={bookerEmail}
                            name="email"
                            placeholder="Your Class Name"
                            className="input input-bordered"
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">The mail</span>
                        </label>
                        <textarea
                            {...register('content')}
                            name="content"
                            value={mail}
                            placeholder="Class Description"
                            className="textarea textarea-bordered h-60"
                        />
                    </div>
                    <div className="form-control mt-6 ">
                        {
                            !isSubmitting ? <motion.input
                                className={`w-1/6 p-3 justify-end bg-purple-500 hover:bg-red-800 rounded-xl text-center`}
                                type="submit"
                                value="Send"
                                disabled={isSubmitting}
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.9 }}
                                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                            /> :
                                <h1 className='w-1/6 p-3 justify-end bg-gray-300 rounded-xl text-center'>Submitted</h1>
                        }
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MemberReject;