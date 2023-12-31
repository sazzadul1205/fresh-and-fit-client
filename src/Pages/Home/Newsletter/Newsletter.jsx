import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';
import Title from "../../Shared/PageTitles/Title";
import "./Newsletter.css";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const Newsletter = () => {
    const { register, handleSubmit } = useForm();
    const axiosPublic = useAxiosPublic();

    const currentDate = new Date();
    const formattedDateTime = currentDate.toLocaleString('en-US', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    });

    const onSubmit = (data) => {
        console.log(data);
        const Subscriber = {
            name: data.name,
            email: data.email,
            date: formattedDateTime,
        }

        axiosPublic.post('/newsLetter', Subscriber)
            .then(res => {
                if (res.data.insertedId) {
                    showSuccessAlert()
                }
            })
            .catch(error => {
                console.log(error);
                showErrorAlert('Failed to update user profile.');
            });
    };


    const showSuccessAlert = () => {
        Swal.fire({
            title: 'Subscription Successful!',
            text: `Thank you! You are now a new News Letter subscribed.`,
            icon: 'success',
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false
        });
    };
    const showErrorAlert = (errorMessage) => {
        Swal.fire({
            icon: 'error',
            title: 'News Letter Sign Up Failed',
            text: errorMessage,
        });
    };

    return (
        <div>
            <Title
                title={'Join The Newsletter'}
                subTitle={'Subscribe to get the latest Content by Email'}
            ></Title>
            <div className="">
                <form onSubmit={handleSubmit(onSubmit)} className="card-body Newsletter-item bg-fixed md:w-3/4 lg:w-[1200px]  mx-auto">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-black text-2xl">Name</span>
                        </label>
                        <input
                            type="text"
                            {...register("name", { required: true })}
                            name="name"
                            placeholder="Name"
                            className="input input-bordered text-black" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-black text-2xl">Email</span>
                        </label>
                        <input
                            type="email"
                            {...register("email", { required: true })}
                            name="email"
                            placeholder="Email"
                            className="input input-bordered text-black" />
                    </div>

                    <div className="form-control mt-6">
                        <input
                            className={`w-full p-3 bg-red-500 hover:bg-red-800 text-black rounded-xl`}
                            type="submit"
                            value='Subscribe' />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Newsletter;
