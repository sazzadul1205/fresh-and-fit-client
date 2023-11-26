import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import Title from "../Shared/PageTitles/Title";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const AddClasses = () => {
    const { register, handleSubmit } = useForm();
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const onSubmit = (data) => {
        const classInfo = {
            className: data.className,
            classDescription: data.description,
            trainerName: user.displayName,
            trainerEmail: user.email,
            classTime: `${data.classStart} - ${data.classEnd}`,
        };

        axiosPublic
            .post('/classes', classInfo)
            .then((res) => {
                if (res.data.insertedId) {
                    showSuccessAlert();
                    navigate('/classes');
                }
            })
            .catch((error) => {
                console.error(error);
                showErrorAlert('Failed to create a new class.');
            });
    };

    const showSuccessAlert = () => {
        Swal.fire({
            icon: 'success',
            title: 'Class Created!',
            text: 'Your fitness class has been successfully created.',
        });
    };

    const showErrorAlert = (errorMessage) => {
        Swal.fire({
            icon: 'error',
            title: 'Class Creation Failed',
            text: errorMessage,
        });
    };

    return (
        <div>
            <Helmet>
                <title>Fresh & Fit || Add Classes</title>
            </Helmet>
            <div className="pt-20">
                <Title
                    title={'Create a New Fitness Class'}
                    subTitle={"Craft the Perfect Class and Invite Participants to a Healthier Lifestyle"}
                ></Title>
            </div>
            <div>
                <div className="card md:w-1/2 max-w-sm shadow-2xl bg-red-500 opacity-90 mx-auto">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Class Name</span>
                            </label>
                            <input
                                type="text"
                                {...register('className', { required: true })}
                                name="className"
                                placeholder="Your Class Name"
                                className="input input-bordered"
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Trainer Name</span>
                            </label>
                            <input
                                type="text"
                                {...register('trainerName')}
                                defaultValue={user.displayName}
                                name="trainerName"
                                placeholder="Trainer's Name"
                                className="input input-bordered"
                                disabled
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Description</span>
                            </label>
                            <textarea
                                {...register('description')}
                                name="description"
                                placeholder="Class Description"
                                className="textarea textarea-bordered"
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Class Start</span>
                            </label>
                            <input
                                type="time"
                                {...register('classStart')}
                                name="classStart"
                                placeholder="Class Start Time"
                                className="input input-bordered"
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Class End</span>
                            </label>
                            <input
                                type="time"
                                {...register('classEnd')}
                                name="classEnd"
                                placeholder="Class End Time"
                                className="input input-bordered"
                            />
                        </div>
                        <div className="form-control mt-6">
                            <motion.input
                                className={`w-full p-3 bg-purple-500 hover:bg-red-800 disabled:bg-gray-500 rounded-xl`}
                                type='submit'
                                value={'Create a new class'}
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.9 }}
                                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddClasses;
