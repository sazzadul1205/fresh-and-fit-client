import { useForm } from "react-hook-form";
import Title from "../../Pages/Shared/PageTitles/Title";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const AddNewForm = () => {
    const { register, handleSubmit } = useForm();
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();

    const onSubmit = (data) => {
        const form = {
            title: data.title,
            content: data.content,
            sender: user.displayName,
            likes: 0,
            dislikes: 0,
        };

        axiosPublic
            .post('/forms', form)
            .then((res) => {
                if (res.data.insertedId) {
                    showSuccessAlert();
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
            confirmButtonText: 'OK',
            onClose: () => {
                console.log('User clicked OK');
            },
        });
    };

    const showErrorAlert = (errorMessage) => {
        Swal.fire({
            icon: 'error',
            title: 'Class Creation Failed',
            text: errorMessage,
            confirmButtonText: 'OK', 
            onClose: () => {
                console.log('User clicked OK');
            },
        });
    };

    return (
        <div>
            <Helmet>
                <title>Fresh & Fit || Add New Form</title>
            </Helmet>
            <div>
                <Title
                    title="Add New Class"
                    subTitle="Create a new class by filling out the form below."
                />
            </div>
            <div>
                <div className="card md:w-1/2 max-w-sm shadow-2xl bg-red-500 opacity-90 mx-auto">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Title</span>
                            </label>
                            <input
                                type="text"
                                {...register('title', { required: true })}
                                name="title"
                                placeholder="Your Class Name"
                                className="input input-bordered"
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Content</span>
                            </label>
                            <textarea
                                {...register('content')}
                                name="content"
                                placeholder="Class Description"
                                className="textarea textarea-bordered"
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Sender</span>
                            </label>
                            <input
                                type="text"
                                {...register('sender')}
                                defaultValue={user.displayName}
                                name="sender"
                                placeholder={user.displayName}
                                className="input input-bordered"
                                disabled
                            />
                        </div>
                        <div className="form-control mt-6">
                            <motion.input
                                className={`w-full p-3 bg-purple-500 hover:bg-red-800 disabled:bg-gray-500 rounded-xl`}
                                type="submit"
                                value="Create a new class"
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

export default AddNewForm;
