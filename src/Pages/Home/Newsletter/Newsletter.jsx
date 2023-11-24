import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';
import Title from "../../Shared/PageTitles/Title";
import "./Newsletter.css";

const Newsletter = () => {
    const { register, handleSubmit } = useForm();

    const onSubmit = (data) => {
        console.log(data);

        // Show SweetAlert on successful submission
        Swal.fire({
            title: 'Subscription Successful!',
            text: `Thank you, ${data.name}! You are now subscribed.`,
            icon: 'success',
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false
        });

    };

    return (
        <div>
            <Title
                title={'Join The Newsletter'}
                subTitle={'Subscribe to get latest Content by Email'}
            ></Title>
            <div className="">
                <form onSubmit={handleSubmit(onSubmit)} className="card-body Newsletter-item bg-fixed">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-black text-2xl">Name</span>
                        </label>
                        <input
                            type="text"
                            {...register("name", { required: true })}
                            name="name"
                            placeholder="name"
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
                            placeholder="email"
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
