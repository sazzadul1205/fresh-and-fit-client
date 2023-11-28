import { Rating } from "@smastrom/react-rating";
import useAuth from "../../../Hooks/useAuth";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const AddTestimonials = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [rating, setRating] = useState(0);
    const { register, handleSubmit } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        const testimonialData = {
            name: user.displayName,
            avatar: user.photoURL,
            quote: data.quote,
            rating: rating,
        };
        console.log(testimonialData);

        axiosSecure
            .post('/testimonials', testimonialData)
            .then((res) => {
                if (res.data.insertedId) {
                    showSuccessAlert();
                }
            })
            .catch((error) => {
                console.error(error);
                showErrorAlert('Failed to submit testimonial.');
            });
    };

    const showSuccessAlert = () => {
        Swal.fire({
            icon: 'success',
            title: 'Testimonial Submitted!',
            text: 'Your testimonial has been successfully submitted.',
            confirmButtonText: 'OK',
        });
    };

    const showErrorAlert = (errorMessage) => {
        Swal.fire({
            icon: 'error',
            title: 'Submission Failed',
            text: errorMessage,
            confirmButtonText: 'OK',
        });
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <Helmet>
                <title>Fresh & Fit || Add Testimonial</title>
            </Helmet>
            <div className="w-[500px] bg-white p-8 rounded shadow-lg">
                <h1 className="text-3xl font-bold text-red-500 text-center mb-5">
                    Your Testimonial
                </h1>
                <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                    <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-600">
                            Name
                        </label>
                        <input
                            type="text"
                            {...register('name')}
                            name="name"
                            defaultValue={user?.displayName}
                            placeholder="Your Name"
                            className="input input-bordered w-full"
                            disabled
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-600">
                            Avatar
                        </label>
                        <input
                            type="url"
                            {...register('avatar')}
                            value={user?.photoURL}
                            defaultValue={user?.photoURL}
                            placeholder="Photo URL"
                            className="input input-bordered w-full"
                            disabled
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Quote</span>
                        </label>
                        <textarea
                            {...register('quote', { required: true })}
                            name="quote"
                            placeholder="Your testimonial..."
                            className="textarea textarea-bordered"
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Rating</span>
                        </label>
                        <Rating
                            style={{ maxWidth: 180 }}
                            value={rating}
                            onChange={setRating}
                            isRequired
                        />
                    </div>

                    <div className="flex justify-center items-center mt-4">
                        <motion.input
                            className={`w-full p-3 bg-red-500 hover:bg-red-800 disabled:bg-gray-500 rounded-xl`}
                            type="submit"
                            value="Submit Testimonials"
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddTestimonials;
