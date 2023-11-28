import React from 'react';
import { Link } from "react-router-dom";
import useTrainers from "../../../Hooks/useTrainers";
import Title from "../../Shared/PageTitles/Title";
import TrainerCard from "../TrainerCards/TrainerCards";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import useAuth from "../../../Hooks/useAuth";
import { Orbitals } from "react-spinners-css";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const Trainer = () => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();

    const { data: trainers = [], isLoading } = useQuery({
        queryKey: ['trainers'],
        queryFn: async () => {
            const res = await axiosPublic.get('/trainers')
            return res.data;
        }
    });

    const { data: myAccount = [], isLoading: isUserLoading } = useQuery({
        queryKey: ['myAccount'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/users?email=${user?.email}`);
            return res.data;
        },
    });

    if (isLoading || isUserLoading) {
        return <div className="text-center"><Orbitals color="#FF0000" size={32} /></div>
    }

    const isUserLoggedIn = !!user;
    const isUserAdminOrTrainer = user && (user.role === 'admin' || user.role === 'trainer');

    return (
        <div>
            <Helmet>
                <title>Fresh & Fit || Trainer</title>
            </Helmet>
            <div className="pt-20">
                <Title
                    title={'Meet Our Dedicated Fitness Trainers'}
                    subTitle={"Experience Excellence in Health and Wellness with Our Expert Fitness Professionals"}
                ></Title>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {trainers.map(trainer => (
                    <TrainerCard key={trainer._id} trainer={trainer}></TrainerCard>
                ))}
            </div>
            {isUserLoggedIn && isUserAdminOrTrainer && (
                <div className="mt-10 mx-auto flex justify-center">
                    <Link to={'/beATrainer'}>
                        <motion.input
                            className={`w-full p-3 bg-red-500 hover:bg-red-800 rounded-xl`}
                            type="submit"
                            value={'Become a Trainer'}
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        />
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Trainer;
