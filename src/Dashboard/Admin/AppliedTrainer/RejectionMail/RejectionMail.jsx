import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import useAuth from '../../../../Hooks/useAuth';
import Title from '../../../../Pages/Shared/PageTitles/Title';
import { useLoaderData, useNavigate } from 'react-router-dom';
import useAxiosPublic from '../../../../Hooks/useAxiosPublic';
import Swal from 'sweetalert2';

const RejectionMail = () => {
    const { user } = useAuth();
    const form = useRef();
    const { register, handleSubmit } = useForm();
    const { _id, email, fullName } = useLoaderData();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const mail = `I hope this message finds you well. Thank you for expressing your interest in joining our team as a trainer at Fresh & Fit.

After careful consideration and review of your application, we regret to inform you that we are unable to proceed with your application at this time. We appreciate the effort and enthusiasm you put into your application, and we understand that this news may be disappointing.

Our decision was not easy, as we received many qualified applications. We encourage you to continue pursuing your passion for fitness, and we wish you success in your future endeavors.

Please feel free to reach out if you have any questions or if there's anything specific you'd like feedback on. We appreciate your understanding.

Thank you once again for considering Fresh & Fit as a platform for your skills and expertise.`;

    const onSubmit = (data) => {
        setIsSubmitting(true);


        const templateParams = {
            from_name: `${user.displayName}`,
            to_name: `${fullName}`,
            message: `${data.content}`,
            to_email: `${email}`,
            from_email: `${user.displayName}`,
        };

        emailjs
            .send('service_793r2nu', 'template_zxjvjc9', templateParams, '2E4m6SmAxA_qFfFN9')
            .then(
                (res) => {
                    console.log('SUCCESS!', res.status, res.text);
                    axiosPublic
                        .delete(`/nTrainerRequest/${_id}`)
                        .then(() => {
                            showSuccessAlert();
                            navigate(`/dashboard/appliedTrainer`)
                        })
                        .catch((error) => {
                            console.log(error);
                            showErrorAlert('Failed to update user profile.');
                        });
                    
                },
                (error) => {
                    console.log('FAILED...', error);
                    showErrorAlert('Failed to send rejection email.');
                }
            )
            .finally(() => {
                setIsSubmitting(false);
            });
    };

    const showSuccessAlert = () => {
        Swal.fire({
            icon: 'success',
            title: 'Email Sent!',
            text: `Rejection email has been sent successfully to ${fullName}.`,
        });
    };

    const showErrorAlert = (errorMessage) => {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: errorMessage || 'Something went wrong.',
        });
    };

    return (
        <div>
            <Title title={'Send Mail'} />
            <div className="card w-full shadow-2xl bg-gray-800 ">
                <form ref={form} onSubmit={handleSubmit(onSubmit)} className="card-body ">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input
                            type="text"
                            {...register('name', { required: true })}
                            value={fullName}
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
                            value={email}
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

export default RejectionMail;
