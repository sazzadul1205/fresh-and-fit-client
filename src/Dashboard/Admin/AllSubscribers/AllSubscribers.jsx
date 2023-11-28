import { useQuery } from "@tanstack/react-query";
import Title from "../../../Pages/Shared/PageTitles/Title";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { Helmet } from "react-helmet-async";


const AllSubscribers = () => {
    const axiosPublic = useAxiosPublic();
    const { data: newsLetter = [], isLoading } = useQuery({
        queryKey: ['newsLetter'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/newsLetter`);
            return res.data;
        }
    });

    if (isLoading) {
        <p>Loading ...</p>
    }

    return (
        <div>
            <Helmet>
                <title>Fresh & Fit || All Subscribers</title>
            </Helmet>
            <Title
                title={"News Letter Subscribers Management"}
            ></Title>
            <table className="table-auto mx-auto w-[800px]">
                <thead>
                    <tr className="bg-red-500">
                        <th className="px-4 py-2">#</th>
                        <th className="px-4 py-2">Email</th>
                        <th className="px-4 py-2">Name</th>
                    </tr>
                </thead>
                <tbody>
                    {newsLetter.map((subscriber, index) => (
                        <tr key={subscriber.id} className="bg-gray-200">
                            <td className="border px-4 py-2">{index + 1}</td>
                            <td className="border px-4 py-2">{subscriber.email}</td>
                            <td className="border px-4 py-2">{subscriber.name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AllSubscribers;
