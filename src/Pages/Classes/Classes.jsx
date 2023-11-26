import { Link } from 'react-router-dom';
import Title from '../Shared/PageTitles/Title';
import AllClasses from './AllClasses/AllClasses';
import WeeklySH from './WeeklySH/WeeklySH';
import { motion } from "framer-motion";

const Classes = () => {

    return (
        <div className="pt-20">
            <div>
                <Title
                    title={'Discover and Join Fitness Classes'}
                    subTitle={'Explore our weekly schedule and a variety of fitness classes. Join now to embark on a journey to a healthier you!'}
                ></Title>
            </div>
            <div>
                <WeeklySH></WeeklySH>
            </div>
            <div>
                <AllClasses></AllClasses>
            </div>
            <div>
                <Link to={'/addClasses'} className="flex justify-center items-center mt-8">
                    <motion.input
                        className={`w-1/5 p-3 bg-red-500 hover:bg-red-800 rounded-xl`}
                        type='submit'
                        value={'Add New Classes'}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    />
                </Link>

            </div>
        </div>
    );
};

export default Classes;