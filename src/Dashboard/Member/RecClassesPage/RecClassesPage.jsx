import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Title from "../../../Pages/Shared/PageTitles/Title";
import { Helmet } from "react-helmet-async";

const RecClassesPage = () => {
    const axiosPublic = useAxiosPublic();

    const { data: recClasses = [], isLoading: isLoadingRecClasses } = useQuery({
        queryKey: ['classes'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/classes`);
            return res.data;
        },
    });

    if (isLoadingRecClasses) {
        return <p>Loading ...</p>
    }

    // Randomly select 6 classes
    const randomClasses = recClasses.sort(() => 0.5 - Math.random()).slice(0, 6);

    return (
        <div>
            <Helmet>
                <title>Fresh & Fit || Rec Classes</title>
            </Helmet>
            <div>
                <Title
                    title="Recommended Classes"
                ></Title>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mx-10">
                {randomClasses.map((classItem, index) => (
                    <div key={index} className="card-body bg-red-500 flex rounded-xl text-white">
                        <p className="card-title text-lg text-green-500">Description: {classItem.classDescription}</p>
                        <p>Trainer: {classItem.trainerName}</p>
                        <p>Time: {classItem.classTime}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecClassesPage;
