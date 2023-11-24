import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import SocialLogin from "../Shared/SocialLogin/SocialLogin";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";

const Login = () => {
    const { register, handleSubmit } = useForm();
    const { singIn } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    const onSubmit = (data) => {
        console.log(data);
        singIn(data.email, data.password)
            .then(res => {
                const user = res.user
                console.log(user);
                showSuccessLogInAlert();
                navigate(from, { replace: true })
            })
            .catch(error => {
                console.log(error);
                showFailedLogInAlert(error.message);
            });
    }

    const showSuccessLogInAlert = () => {
        Swal.fire({
            icon: 'success',
            title: 'Login Successful!',
            text: 'You are now logged in.',
        });
    };

    const showFailedLogInAlert = (errorMessage) => {
        Swal.fire({
            icon: 'error',
            title: 'Login Failed',
            text: errorMessage,
        });
    };

    return (
        <div>
            <Helmet>
                <title>Fresh & Fit || Log In</title>
            </Helmet>
            <div className="hero min-h-screen SignUp-background ">
                <div className="hero-content flex-col md:flex-row mt-20 ">
                    <div className="text-center md:w-1/2 lg:text-left ml-10 text-red-500">
                        <h1 className="text-5xl font-bold">Welcome Back to Fresh & Fit!</h1>
                        <p className="py-6">
                            Log in to continue your fitness journey with Fresh & Fit! Access personalized
                            workouts, expert guidance, and connect with the supportive community.
                        </p>
                    </div>
                    <div className="card md:w-1/2 max-w-sm shadow-2xl bg-base-100 opacity-90">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
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
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type="password"
                                    {...register('password', {
                                        required: true,
                                    })}
                                    name="password"
                                    placeholder="Your Password"
                                    className="input input-bordered"
                                    required
                                />
                            </div>

                            <div className="form-control mt-6">
                                <input
                                    className={`w-full p-3 bg-red-500 hover:bg-red-800 disabled:bg-gray-500 rounded-xl`}
                                    type="submit"
                                    value="Log In"
                                />
                                <h1 className="font-normal text-sm mt-2">
                                    Don`t have an account?{' '}
                                    <span className="text-[#FF3811]">
                                        <Link to={'/signUp'}>Sign Up</Link>
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

export default Login;
