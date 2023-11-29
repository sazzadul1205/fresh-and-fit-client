import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://fresh-and-fit-server.vercel.app',
})
const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;

// https://www.facebook.com/groups/webdevelopmentbatch8/posts/337286658908947
// https://www.facebook.com/groups/webdevelopmentbatch8/posts/337498442221102/