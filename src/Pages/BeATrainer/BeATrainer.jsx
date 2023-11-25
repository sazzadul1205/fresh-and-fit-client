import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import Title from "../Shared/PageTitles/Title";

const BeATrainer = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    }

    return (
        <div className="pt-20">
            <Helmet>
                <title>Fresh & Fit || Become a Trainer</title>
            </Helmet>
            <div>
                <div>
                    <Title
                        title={"Join Our Team of Fitness Professionals"}
                        subTitle={'Share your passion for fitness and help others achieve their wellness goals. Apply now to become a valued member of our fitness trainer team.'}
                    ></Title>
                </div>
                <div>
                    <div className="card md:w-1/2 max-w-sm mx-auto shadow-2xl bg-base-100 opacity-90">
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

                            </div>


                            <div className="form-control mt-6">
                                <motion.input
                                    className={`w-full p-3 bg-red-500 hover:bg-red-800 disabled:bg-gray-500 rounded-xl`}
                                    type='submit'
                                    value={'Sign Up'}
                                    whileHover={{ scale: 1.2 }}
                                    whileTap={{ scale: 0.9 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default BeATrainer;