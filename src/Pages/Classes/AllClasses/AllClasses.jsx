import { motion } from "framer-motion";
import Swal from "sweetalert2";
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import { useState } from "react";

const AllClasses = () => {
    const axiosPublic = useAxiosPublic();
    const [currentPage, setCurrentPage] = useState(0);
    const formsPerPage = 9;

    const handleCardClick = (classId, className) => {
        Swal.fire({
            icon: 'success',
            title: 'Class Joined!',
            text: `You have joined the class "${className}". Please wait until the class starts.`,
            timer: 1000,
        });
    };



    const { data: classes = [], refetch: refetchClasses, isLoading: isLoadingClasses } = useQuery({
        queryKey: ['classes', currentPage, formsPerPage],
        queryFn: async () => {
            const res = await axiosPublic.get(`/classes?page=${currentPage}&size=${formsPerPage}`)
            return res.data;
        }
    })

    const { data: classesCount = [], isLoading: isLoadingClassesCount } = useQuery({
        queryKey: ['classesCount'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/classesCount`);
            return res.data;
        }
    });

    if (isLoadingClasses && isLoadingClassesCount) {
        return <p>Loading...</p>;
    }

    const numberOfPages = Math.ceil(classesCount.count / formsPerPage);
    const pages = [...Array(numberOfPages).keys()];

    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
            refetchClasses();
        }
    }

    const handleNextPage = () => {
        if (currentPage < numberOfPages - 1) {
            setCurrentPage(currentPage + 1);
            refetchClasses();
        }
    }

    return (
        <div>
            <h2 className="text-3xl font-semibold mb-4 text-center text-red-500">All Classes</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {classes.map((classItem) => (
                    <div key={classItem.id} className="bg-gray-500 text-white p-4 rounded-md shadow-md">
                        <h3 className="text-xl font-semibold mb-2">{classItem.className}</h3>
                        <p className="">{classItem.classDescription}</p>
                        <p className="text-red-600">
                            Members: {classItem.memberCount}
                        </p>
                        <p className="mb-4">
                            Time: {classItem.classTime}
                        </p>
                        <motion.input
                            className={`w-1/3 text-center p-3 bg-blue-500 hover:bg-blue-800 disabled:bg-gray-500 rounded-xl`}
                            type="submit"
                            onClick={() => handleCardClick(classItem.id, classItem.className)}
                            value="Join Now"
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        />
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

export default AllClasses;
