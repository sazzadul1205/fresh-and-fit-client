import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import Title from '../Shared/PageTitles/Title';
import useAuth from '../../Hooks/useAuth';
import './BeATrainer.css';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const BeATrainer = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        const selectedSkills = skillsArray.filter(skill => data.skills && data.skills.includes(skill));
        const selectedAvailableWeeks = daysArray.filter(week => data.availableTimeWeek && data.availableTimeWeek.includes(week));
        const selectedAvailableDays = timeSlotsArray.filter(day => data.availableTimeDay && data.availableTimeDay.includes(day));
        const BATInfo = {
            fullName: data.name,
            email: user.email,
            age: data.age,
            profileImage: data.profileImage,
            experience: data.experience,
            socialIcons: {
                facebook: data.facebook,
                twitter: data.twitter,
                instagram: data.instagram
            },
            availableSlots: data.availableSlots,
            skills: selectedSkills,
            availableTimeWeek: selectedAvailableWeeks,
            availableTimeDay: selectedAvailableDays,
        };

        console.log(BATInfo);

        axiosPublic.post('/nTrainerRequest', BATInfo)
            .then((response) => {
                if (response.data.insertedId) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Application Submitted Successfully!',
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    navigate('/trainer');
                } else {

                    Swal.fire({
                        icon: 'error',
                        title: 'Error!',
                        text: 'Failed to Submit. Please try again later.',
                    });
                }
            })
            .catch((error) => {
                console.error('Error:', error.message);

                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'An error occurred. Please try again later.',
                });
            });

    }
    // Define an array of skills
    const skillsArray = [
        "Yoga",
        "Pilates",
        "CrossFit",
        "HIIT",
        "Strength Training",
        "Cardio",
        "Weightlifting",
        "Bodybuilding"
    ];
    // Generate checkboxes for skills
    const skillsCheckboxes = skillsArray.map((skill, index) => (
        <label key={index} className="checkbox flex">
            <input
                type="checkbox"
                {...register("skills")}
                value={skill}
            />
            <span className='ml-2'>{skill}</span>
        </label>
    ));

    // Define an array of days
    const daysArray = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
    ];
    // Generate checkboxes for days
    const daysCheckboxes = daysArray.map((day, index) => (
        <label key={index} className="checkbox flex">
            <input
                type="checkbox"
                {...register("availableTimeWeek")}
                value={day}
            />
            <span className='ml-2'>{day}</span>
        </label>
    ));

    // Define an array of time slots
    const timeSlotsArray = ["Morning", "Afternoon", "Evening", "Night"];
    // Generate checkboxes for time slots
    const timeSlotsCheckboxes = timeSlotsArray.map((timeSlot, index) => (
        <label key={index} className="checkbox flex">
            <input
                type="checkbox"
                {...register("availableTimeDay")}
                value={timeSlot}
            />
            <span className='ml-2'>{timeSlot}</span>
        </label>
    ));

    return (
        <div className="pt-20 BAT-background bg-cover pb-10">
            <Helmet>
                <title>Fresh & Fit || Become a Trainer</title>
            </Helmet>
            <div>
                <div className='bg-white opacity-80 py-10'>
                    <Title
                        title={'Join Our Team of Fitness Professionals'}
                        subTitle={'Share your passion for fitness and help others achieve their wellness goals. Apply now to become a valued member of our fitness trainer team.'}
                    ></Title>
                </div>
                <div className=''>
                    <div className="card md:w-1/2 max-w-sm mx-auto shadow-2xl bg-base-100 mb-5">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body ">
                            <div className="form-control">
                                <label className="label" htmlFor="name">
                                    <span className="label-text">Name</span>
                                </label>
                                <input
                                    type="text"
                                    {...register('name', { required: 'Name is required' })}
                                    name="name"
                                    placeholder="Your Name"
                                    className="input input-bordered"
                                />
                                {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                            </div>
                            <div className="form-control">
                                <label className="label" htmlFor="email">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    {...register('email')}
                                    name="email"
                                    placeholder="Your Email"
                                    defaultValue={user?.email}
                                    value={user?.email}
                                    className="input input-bordered"
                                    disabled
                                />
                                {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                            </div>
                            <div className="form-control">
                                <label className="label" htmlFor="age">
                                    <span className="label-text">Age</span>
                                </label>
                                <input
                                    type="number"
                                    {...register('age')}
                                    name="age"
                                    placeholder="Age"
                                    className="input input-bordered"
                                />
                                {errors.age && <p className="text-red-500">{errors.age.message}</p>}
                            </div>
                            <div className="form-control">
                                <label className="label" htmlFor="photoURL">
                                    <span className="label-text">Profile Image</span>
                                </label>
                                <input
                                    type="url"
                                    {...register('profileImage', { required: 'Photo URL is required' })}
                                    placeholder="Photo URL"
                                    className="input input-bordered"
                                />
                                {errors.profileImage && <p className="text-red-500">{errors.profileImage.message}</p>}
                            </div>
                            <div className="form-control">
                                <label className="label" htmlFor="experience">
                                    <span className="label-text">Available Slots</span>
                                </label>
                                <input
                                    type="number"
                                    {...register('availableSlots', { required: 'Experience is required' })}
                                    placeholder="Available Slots"
                                    className="input input-bordered"
                                />
                                {errors.availableSlots && <p className="text-red-500">{errors.availableSlots.message}</p>}
                            </div>

                            <div className="divider">OR</div>
                            <h1 className="text-center">Social Links</h1>

                            <div className="form-control">
                                <label className="label" htmlFor="photoURL">
                                    <span className="label-text">Facebook</span>
                                </label>
                                <input
                                    type="url"
                                    {...register('facebook', { required: 'experience is required' })}
                                    placeholder="Experience"
                                    className="input input-bordered"
                                />
                                {errors.photoURL && <p className="text-red-500">{errors.facebook.message}</p>}
                            </div>
                            <div className="form-control">
                                <label className="label" htmlFor="photoURL">
                                    <span className="label-text">Facebook</span>
                                </label>
                                <input
                                    type="url"
                                    {...register('twitter', { required: 'experience is required' })}
                                    placeholder="Experience"
                                    className="input input-bordered"
                                />
                                {errors.photoURL && <p className="text-red-500">{errors.twitter.message}</p>}
                            </div>
                            <div className="form-control">
                                <label className="label" htmlFor="photoURL">
                                    <span className="label-text">Facebook</span>
                                </label>
                                <input
                                    type="url"
                                    {...register('instagram', { required: 'experience is required' })}
                                    placeholder="Experience"
                                    className="input input-bordered"
                                />
                                {errors.photoURL && <p className="text-red-500">{errors.instagram.message}</p>}
                            </div>

                            <div className="divider">OR</div>

                            <div className="form-control">
                                <label className="label" htmlFor="experience">
                                    <span className="label-text">Experience</span>
                                </label>
                                <input
                                    type="number"
                                    {...register('experience', { required: 'Experience is required' })}
                                    placeholder="Available Slots"
                                    className="input input-bordered"
                                />
                                {errors.experience && <p className="text-red-500">{errors.experience.message}</p>}
                            </div>

                            {/* Skills */}
                            <div className="form-control mt-4">
                                <label className="label">
                                    <span className="label-text text-xl">Skills</span>
                                </label>
                                <div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                                        {skillsCheckboxes}
                                    </div>
                                </div>
                                {errors.skills && <p className="text-red-500">{errors.skills.message}</p>}
                            </div>
                            {/* Days */}
                            <div className="form-control mt-5">
                                <label className="label">
                                    <span className="label-text text-xl">Available Time Week</span>
                                </label>
                                <div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                                        {daysCheckboxes}

                                    </div>
                                </div>
                                {errors.availableTimeWeek && <p className="text-red-500">{errors.availableTimeWeek.message}</p>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-xl">Available Time of Day</span>
                                </label>
                                <div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                                        {timeSlotsCheckboxes}
                                    </div>
                                </div>
                                {errors.availableTimeDay && <p className="text-red-500">{errors.availableTimeDay.message}</p>}
                            </div>


                            <div className="form-control mt-6">
                                <motion.input
                                    className={`w-full p-3 bg-red-500 hover:bg-red-800 disabled:bg-gray-500 rounded-xl`}
                                    type='submit'
                                    whileHover={{ scale: 1.2 }}
                                    whileTap={{ scale: 0.9 }}
                                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
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
