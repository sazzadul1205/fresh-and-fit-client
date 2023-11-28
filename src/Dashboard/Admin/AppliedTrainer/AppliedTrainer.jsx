import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import Title from '../../../Pages/Shared/PageTitles/Title';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const AppliedTrainer = () => {
    const [trainerInfo, setTrainerInfo] = useState(null)
    const axiosPublic = useAxiosPublic();
    const { data: nTrainerRequest = [], isLoading, refetch } = useQuery({
        queryKey: ['nTrainerRequest'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/nTrainerRequest`);
            return res.data;
        }
    });
    if (isLoading) {
        <p>Loading ...</p>
    }

    const [selectedTrainer, setSelectedTrainer] = useState(null);
    console.log(selectedTrainer);

    const openModal = (trainer) => {
        setTrainerInfo(trainer)

        setSelectedTrainer(trainer);
        document.getElementById('my_modal_1').showModal();
    };

    const closeModal = () => {
        setSelectedTrainer(null);
        document.getElementById('my_modal_1').close();
    };
    const currentDate = new Date();
    const formattedDateTime = currentDate.toLocaleString('en-US', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour12: true,
    });

    // Render the skills list
    const renderSkills = () => {
        if (selectedTrainer && selectedTrainer.skills) {
            return selectedTrainer.skills.map((skill, index) => (
                <span key={index} className="mr-2 bg-blue-500 text-white px-2 py-1 rounded">
                    {skill}
                </span>
            ));
        }
        return null;
    };


    const confirmTrainer = async () => {
        const newTrainerInfo = {
            fullName: trainerInfo.fullName,
            email: trainerInfo.email,
            age: trainerInfo.age,
            profileImage: trainerInfo.profileImage,
            experience: trainerInfo.experience,
            socialIcons: trainerInfo.socialIcons,
            availableSlots: trainerInfo.availableSlots,
            skills: trainerInfo.skills,
            availableTimeWeek: trainerInfo.availableTimeWeek,
            availableTimeDay: trainerInfo.availableTimeWeek,
            joinedDate: formattedDateTime,
        };
        console.log(newTrainerInfo);
        axiosPublic
            .post('/trainers', newTrainerInfo)
            .then((res) => {
                if (res.data.insertedId) {
                    showSuccessAlert();
                    axiosPublic
                        .delete(`/nTrainerRequest/${trainerInfo._id}`)
                        .then(() => {
                            axiosPublic
                                .patch(`/users?email=${trainerInfo.email}`)
                                .then((res) => {
                                    if (res.data.insertedId) {
                                        showSuccessAlert();
                                        refetch();
                                    }
                                })
                                .catch((error) => {
                                    console.log(error);
                                    showErrorAlert('Failed to update user profile.');
                                });
                        })
                        .catch((error) => {
                            console.log(error);
                            showErrorAlert('Failed to update user profile.');
                        });
                }
            })
            .catch((error) => {
                console.log(error);
                showErrorAlert('Failed to update user profile.');
            });
    };


    const showSuccessAlert = () => {
        Swal.fire({
            icon: 'success',
            title: 'Trainer Confirmed!',
            text: `Trainer ${selectedTrainer?.fullName} has been confirmed successfully.`,
        });
        closeModal();
    };

    const showErrorAlert = (errorMessage) => {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: errorMessage || 'Failed to confirm trainer.',
        });
    };

    return (
        <div>
            <Helmet>
                <title>Fresh & Fit || Applied Trainers</title>
            </Helmet>
            <div>
                <Title title="Applied Trainers" />
            </div>
            <div>
                <table className="table-auto mx-auto w-[800px]">
                    <thead>
                        <tr className="bg-blue-500">
                            <th className="px-4 py-2">ID</th>
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Email</th>
                            <th className="px-4 py-2">Status</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {nTrainerRequest.map((trainer, index) => (
                            <tr key={trainer._id} className="text-xl mb-3 text-center bg-gray-600">
                                <td>{index + 1}</td>
                                <td>{trainer.fullName}</td>
                                <td>{trainer.email}</td>
                                <td>Pending</td>
                                <td>
                                    <button onClick={() => openModal(trainer)} className="text-blue-500">
                                        👁 View
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Modal for displaying trainer details */}
                <dialog id="my_modal_1" className="modal">
                    <div className="modal-box">
                        <h2>Name: {selectedTrainer && selectedTrainer.fullName}</h2>
                        <img src={selectedTrainer && selectedTrainer.profileImage} alt={selectedTrainer && selectedTrainer.fullName} className="mb-4" />
                        <p>Email: {selectedTrainer && selectedTrainer.email}</p>
                        <p>Age: {selectedTrainer && selectedTrainer.age}</p>
                        <p>Experience: {selectedTrainer && selectedTrainer.experience} years</p>
                        <p>Skills: {renderSkills()}</p>
                        <p>Available Slots: {selectedTrainer && selectedTrainer.availableSlots}</p>
                        <p>Available Time (Week): {selectedTrainer && selectedTrainer.availableTimeWeek.join(', ')}</p>
                        <p>Available Time (Day): {selectedTrainer && selectedTrainer.availableTimeDay.join(', ')}</p>
                        <div className="modal-action">
                            {/* Confirmation button */}
                            <button onClick={confirmTrainer} className="btn bg-green-500">
                                Confirm
                            </button>
                            {/* Reject button (bonus section) */}
                            <Link to={`/dashboard/rejectedTrainer/${selectedTrainer && selectedTrainer._id}`}>
                                <button onClick={closeModal} className="btn bg-red-500 ml-2">
                                    Reject
                                </button>
                            </Link>


                        </div>
                    </div>
                </dialog>

            </div>
        </div>
    );
};

export default AppliedTrainer;
