import useAuth from "../../../Hooks/useAuth";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import Title from "../../../Pages/Shared/PageTitles/Title";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const ProfileSettings = () => {
    const { user, updateUser, updateUserPassword } = useAuth();
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const password = watch("password");

    const onSubmit = (data) => {
        const updateUserInfo = {
            name: data.name,
            password: data.password,
            photoURL: data.photoURL,
            // Add other fields you want to update
        };
        console.log(updateUserInfo);

        updateUser(data.name, data.photoURL)
            .then(() => {
                updateUserPassword(data.password)
                    .then(() => {
                        showSuccessAlert()
                    })
                    .catch(error => {
                        console.log(error);
                        showErrorAlert('Failed to update user profile.');
                    });
            })
            .catch(error => {
                console.log(error);
                showErrorAlert('Failed to update user profile.');
            });

        const showSuccessAlert = () => {
            Swal.fire({
                icon: 'success',
                title: 'Update Successful!',
                text: 'Profile has been updated Successfully.',
            });
        };

        const showErrorAlert = (errorMessage) => {
            Swal.fire({
                icon: 'error',
                title: 'Sign Up Failed',
                text: errorMessage,
            });
        };
    };

    return (
        <div>
            <Helmet>
                <title>Fresh & Fit || Profile Settings</title>
            </Helmet>
            <Title title={'My Account Setting'} />
            <div className="bg-gray-300 min-h-screen flex flex-row items-center justify-center">

                <img src={user?.photoURL} alt="" className="rounded-full w-80 mr-10" />
                <div className="w-[500px] bg-white p-8 rounded shadow-lg">
                    <h1 className="text-3xl font-bold text-red-500 text-center mb-5">
                        Your Profile Settings
                    </h1>
                    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                        <div className="mb-4">
                            <label className="block text-sm font-semibold text-gray-600">
                                Name
                            </label>
                            <input
                                type="text"
                                {...register('name', { required: true })}
                                name="name"
                                defaultValue={user?.displayName}
                                placeholder="Your Name"
                                className="input input-bordered w-full"
                            />
                            {errors.name && (
                                <span className="text-red-600">Name is required</span>
                            )}
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-semibold text-gray-600">
                                Email
                            </label>
                            <input
                                type="email"
                                {...register('email')}
                                name="email"
                                placeholder="Your Email"
                                defaultValue={user?.email}
                                value={user?.email}
                                className="input input-bordered w-full"
                                disabled
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-semibold text-gray-600">
                                Photo URL
                            </label>
                            <input
                                type="url"
                                {...register('photoURL', { required: true })}
                                value={user?.photoURL}
                                placeholder="Photo URL"
                                className="input input-bordered w-full"
                            />
                            {errors.photoURL && (
                                <span className="text-red-600">Photo URL is required</span>
                            )}
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-semibold text-gray-600">
                                Password Update
                            </label>
                            <input
                                type="password"
                                {...register('password', {
                                    required: true,
                                    maxLength: 20,
                                    minLength: 8,
                                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                                })}
                                name="password"
                                placeholder="Your Password"
                                className="input input-bordered w-full"
                                required
                            />
                            {errors.password?.type === 'required' && (
                                <p className="text-red-600" role="alert">
                                    Password is required
                                </p>
                            )}
                            {errors.password?.type === 'minLength' && (
                                <p className="text-red-600" role="alert">
                                    Password must be 8 characters
                                </p>
                            )}
                            {errors.password?.type === 'maxLength' && (
                                <p className="text-red-600" role="alert">
                                    Password must be below 20 characters
                                </p>
                            )}
                            {errors.password?.type === 'pattern' && (
                                <p className="text-red-600" role="alert">
                                    Password must have at least one upper case, one lower case, special characters, and a number
                                </p>
                            )}
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-semibold text-gray-600">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                {...register('confirmPassword', {
                                    required: true,
                                    validate: value => value === password || "Passwords do not match",
                                })}
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                className="input input-bordered w-full"
                                required
                            />
                            {errors.confirmPassword?.type === 'required' && (
                                <p className="text-red-600" role="alert">
                                    Confirm Password is required
                                </p>
                            )}
                            {errors.confirmPassword?.type === 'validate' && (
                                <p className="text-red-600" role="alert">
                                    {errors.confirmPassword.message}
                                </p>
                            )}
                        </div>
                        <div className="flex justify-center items-center mt-4">
                            <motion.input
                                className={`w-full p-3 bg-red-500 hover:bg-red-800 text-black rounded-xl`}
                                type='submit'
                                value={'Update Profile'}
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

export default ProfileSettings;
