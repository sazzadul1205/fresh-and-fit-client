import { FaHandPointLeft } from "react-icons/fa";
import Title from "../../Pages/Shared/PageTitles/Title";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAuth from "../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";

const DashboardHome = () => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();

    const { data: myAccount = [], isLoading: isUserLoading } = useQuery({
        queryKey: ['myAccount'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/users?email=${user?.email}`);
            return res.data;
        },
        enabled: !!user,
    });

    if (isUserLoading || !myAccount) {
        return <p>Loading...</p>;
    }


    return (
        <div className="my-auto">
            <Helmet>
                <title>Fresh & Fit || Dashboard Home</title>
            </Helmet>
            <Title
                title="Welcome to Your Dashboard"
                subTitle="Explore, manage, and stay connected."
            />
            <div className="text-2xl font-bold text-center text-red-500">
                <p className="text-3xl">Name: <span className="text-green-500">{user?.displayName}</span></p>
                <p>My Role: <span className="text-green-600">{myAccount?.role}</span></p>
            </div>

            <div className="mt-60 flex gap-5 ml-10">
                <div>
                    <FaHandPointLeft className="text-7xl text-red-500 mt-6"></FaHandPointLeft>
                </div>
                <div>
                    <Title
                        title={'Explore your Options'}
                    ></Title>
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;
