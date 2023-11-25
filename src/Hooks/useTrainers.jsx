import { useQuery } from "@tanstack/react-query"
import useAxiosPublic from "./useAxiosPublic";

const useTrainers = () => {
    const axiosPublic = useAxiosPublic();

    const { data: trainer = [], isLoading, isError, refetch } = useQuery({
        queryKey: ['trainer'],
        queryFn: async () => {
            const res = await axiosPublic.get('/trainers')
            return res.data;
        }
    })
    return [trainer, isLoading, isError, refetch]
};

export default useTrainers;