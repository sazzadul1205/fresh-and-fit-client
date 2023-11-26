import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';


const AllClasses = () => {
    const axiosPublic = useAxiosPublic();

    const [expandedClass, setExpandedClass] = useState(null);

    const handleCardClick = (classId) => {
        setExpandedClass(expandedClass === classId ? null : classId);
    };
    const { data: classes = [] } = useQuery({
        queryKey: ['classes'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/classes`)
            return res.data;
        }
    })

    return (
        <div>
            <h2 className="text-3xl font-semibold mb-4 text-center text-red-500">All Classes</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                {classes.map((classItem) => (
                    <div key={classItem.id} className="card w-96 bg-base-100 shadow-xl mb-4" onClick={() => handleCardClick(classItem.id)}>
                        <div className="card-body">
                            <h2 className="card-title">{classItem.className}</h2>
                            {expandedClass === classItem.id ? (
                                <>
                                    <p>Description: {classItem.classDescription}</p>
                                    <p>Trainer: {classItem.trainerName}</p>
                                    <p>Time: {classItem.classTime}</p>
                                </>
                            ) : (
                                <p>{classItem.classDescription.slice(0, 50)}...</p>
                            )}
                            <div className="card-actions justify-end">
                                {expandedClass === classItem.id && (
                                    <Link to={`/trainer`}>
                                        <motion.input
                                            className={`w-40 p-3 bg-red-500 hover:bg-red-800 disabled:bg-gray-500 rounded-xl`}
                                            type='submit'
                                            value={'Join in'}
                                            whileHover={{ scale: 1.2 }}
                                            whileTap={{ scale: 0.9 }}
                                            transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                        />
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllClasses;
