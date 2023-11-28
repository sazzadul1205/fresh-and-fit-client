import { useState } from 'react';
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from '@tanstack/react-query';
import Title from "../Shared/PageTitles/Title";
import { motion } from "framer-motion";
import { Helmet } from 'react-helmet-async';
import adminBaj from '../../assets/adminbaj.png'
import trainerBaj from '../../assets/trainerbaj.png'
import { Orbitals } from 'react-spinners-css';

const Forms = () => {
    const axiosPublic = useAxiosPublic();
    const [likes, setLikes] = useState({});
    const [currentPage, setCurrentPage] = useState(0);
    const [dislikes, setDislikes] = useState({});
    const [disabledButtons, setDisabledButtons] = useState([]);
    const formsPerPage = 6;

    const { data: forms = [], refetch: refetchForms, isLoading: isLoadingForms } = useQuery({
        queryKey: ['forms', currentPage, formsPerPage],
        queryFn: async () => {
            const res = await axiosPublic.get(`/forms?page=${currentPage}&size=${formsPerPage}`);
            return res.data;
        }
    });

    const { data: formsCount = [], isLoading: isLoadingFormsCount } = useQuery({
        queryKey: ['formsCount'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/formsCount`);
            return res.data;
        }
    });

    const { data: users = [], isLoading: isLoadingUsers } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/users`);
            return res.data;
        },
    });

    if (isLoadingForms || isLoadingFormsCount || isLoadingUsers) {
        return <div className="text-center"><Orbitals color="#FF0000" size={32}/></div>
    }

    const numberOfPages = Math.ceil(formsCount.count / formsPerPage);
    const pages = [...Array(numberOfPages).keys()];

    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
            refetchForms();
        }
    }

    const handleNextPage = () => {
        if (currentPage < numberOfPages - 1) {
            setCurrentPage(currentPage + 1);
            refetchForms();
        }
    }

    const userRoleMap = {};
    users.forEach((user) => {
        userRoleMap[user.email] = user.role;
    });

    const handleLike = async (formId) => {
        if (!disabledButtons.includes(formId)) {
            setLikes({ ...likes, [formId]: (likes[formId] || forms.likes) + 1 });
            setDisabledButtons([...disabledButtons, formId]);
        }
    };

    const handleDislike = async (formId) => {
        if (!disabledButtons.includes(formId)) {
            setDislikes({ ...dislikes, [formId]: (dislikes[formId] || forms.dislikes) + 1 });
            setDisabledButtons([...disabledButtons, formId]);
        }
    };

    return (
        <div className="pt-20">
            <Helmet>
                <title>Fresh & Fit || Forms</title>
            </Helmet>
            <div>
                <Title
                    title={'Fitness Forum'}
                    subTitle={'Explore and engage with posts from the fitness community. Share your thoughts, ask questions, and stay informed!'}
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {forms.map((form) => (
                    <div key={form._id} className="card text-primary-content bg-gray-400">
                        <div className="card-body flex">
                            <div className='flex'>
                                <h2 className="card-title">{form.title}</h2>
                                {userRoleMap[form.email] === 'admin' && <img src={adminBaj} alt="" className="mr-4 w-10" />}
                                {userRoleMap[form.email] === 'trainer' && <img src={trainerBaj} alt="" className="mr-4 w-10" />}

                            </div>
                            <div>
                                <p>{form.content}</p>
                                <div className="flex justify-between items-center mt-4">
                                    <span className="text-red-500 font-bold">Posted by: {form.sender}</span>
                                </div>
                                <div className="flex space-x-2 mt-2">
                                    <motion.input
                                        className={`w-full p-3 text-white bg-green-500 hover:bg-green-800 disabled:bg-gray-500 rounded-xl`}
                                        type='submit'
                                        value={`Like ${likes[form._id] || form.likes}`}
                                        whileHover={{ scale: 1.2 }}
                                        whileTap={{ scale: 0.9 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                        disabled={disabledButtons.includes(form._id)}
                                        onClick={() => handleLike(form._id)}
                                    />
                                    <motion.input
                                        className={`w-full p-3 text-white bg-red-500 hover:bg-red-800 ${disabledButtons.includes(form._id) && 'cursor-not-allowed opacity-50'} rounded-xl`}
                                        type='submit'
                                        value={`Dislike ${dislikes[form._id] || form.dislikes}`}
                                        whileHover={{ scale: 1.2 }}
                                        whileTap={{ scale: 0.9 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                        disabled={disabledButtons.includes(form._id)}
                                        onClick={() => handleDislike(form._id)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                ))}
            </div>
            <div className="join mt-10 " style={{ display: 'flex', justifyContent: 'center' }}>
                <button onClick={handlePrevPage} className="join-item btn">«</button>
                {pages.map((page) => (
                    <button
                        onClick={() => setCurrentPage(page)}
                        key={page}
                        className={`join-item btn ${currentPage === page && 'bg-purple-500'}`}
                    >
                        {page + 1}
                    </button>
                ))}
                <button onClick={handleNextPage} className="join-item btn">»</button>
            </div>
        </div>
    );
};

export default Forms;
