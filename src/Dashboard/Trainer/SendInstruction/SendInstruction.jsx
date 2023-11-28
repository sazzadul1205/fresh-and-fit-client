import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
import Title from "../../../Pages/Shared/PageTitles/Title";
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';

const SendInstruction = () => {
    const { user } = useAuth();
    const { register, handleSubmit } = useForm();
    const {bookerEmail, bookerName } = useLoaderData();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

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
            <Title title={'Send Instructions'} />
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

export default SendInstruction;