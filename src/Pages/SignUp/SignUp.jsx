import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Helmet } from 'react-helmet-async';
import useAuth from '../../Hooks/useAuth';
import Swal from "sweetalert2";
import './SignUp.css'
import SocialLogin from '../Shared/SocialLogin/SocialLogin';
const SignUp = () => {
    const { createUser, updateUser } = useAuth();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const navigate = useNavigate()

    const onSubmit = (data) => {
        createUser(data.email, data.password)
            .then(res => {
                const user = res.user;
                console.log(user);
                updateUser(data.name, data.photoURL)
                    .then(() => {
                        showSuccessAlert();
                        reset();
                        navigate('/');
                    })
                    .catch(error => {
                        console.log(error);
                        showErrorAlert('Failed to update user profile.');
                    });
            })
            .catch(error => {
                console.log(error);
                showErrorAlert(error.message);
            });
    };

    const showSuccessAlert = () => {
        Swal.fire({
            icon: 'success',
            title: 'Sign Up Successful!',
            text: 'You can now log in with your credentials.',
        });
    };

    const showErrorAlert = (errorMessage) => {
        Swal.fire({
            icon: 'error',
            title: 'Sign Up Failed',
            text: errorMessage,
        });
    };

    return (
        <div>
            <Helmet>
                <title>Fresh & Fit || Sign Up</title>
            </Helmet>
            <div className="hero min-h-screen SignUp-background ">
                <div className="hero-content flex-col md:flex-row-reverse mt-20 ">
                    <div className="text-center md:w-1/2 lg:text-left ml-10 text-red-500">
                        <h1 className="text-5xl font-bold">Join Fresh & Fit Today!</h1>
                        <p className="py-6">
                            Elevate your fitness journey with Fresh & Fit! Sign up now to access personalized
                            workouts, expert guidance, and a supportive community.
                        </p>
                    </div>
                    <div className="card md:w-1/2 max-w-sm shadow-2xl bg-base-100 opacity-90">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input
                                    type="text"
                                    {...register('name', { required: true })}
                                    name="name"
                                    placeholder="Your Name"
                                    className="input input-bordered"
                                />
                                {errors.name && (
                                    <span className="text-red-600">Name is required</span>
                                )}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    {...register('email', { required: true })}
                                    name="email"
                                    placeholder="Your Email"
                                    className="input input-bordered"
                                />
                                {errors.email && (
                                    <span className="text-red-600">Email is required</span>
                                )}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo URL</span>
                                </label>
                                <input
                                    type="url"
                                    {...register('photoURL', { required: true })}
                                    placeholder="Photo URL"
                                    className="input input-bordered"
                                />
                                {errors.photoURL && (
                                    <span className="text-red-600">Photo URL is required</span>
                                )}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
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
                                    className="input input-bordered"
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
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">
                                        Forgot password?
                                    </a>
                                </label>
                            </div>

                            <div className="form-control mt-6">
                                <input
                                    className={`w-full p-3 bg-red-500 hover:bg-red-800 disabled:bg-gray-500 rounded-xl`}
                                    type="submit"
                                    value="Sign Up"
                                />
                                <h1 className="font-normal text-sm mt-2">
                                    Already have an account?{' '}
                                    <span className="text-[#FF3811]">
                                        <Link to={'/login'}>Log In</Link>
                                    </span>
                                </h1>
                            </div>
                        </form>
                        <div className="divider">OR</div>
                        <div className='mx-auto'>
                            <SocialLogin></SocialLogin>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
