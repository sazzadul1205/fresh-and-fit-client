import { NavLink, Outlet } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
const Dashboard = () => {

    const { user } = useAuth()
    const axiosPublic = useAxiosPublic();
    console.log(user);


    const { data: myAccount = [] } = useQuery({
        queryKey: ['myAccount'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/users/${user?.email}`)
            return res.data;
        }
    })
    console.log(myAccount);

    // Navbar links
    const navLinks = [
        { to: "/", label: "Home" },
        { to: "/gallery", label: "Gallery" },
        { to: "/trainer", label: "Trainer" },
        { to: "/classes", label: "Classes" },
        { to: "/forms", label: "Forms" },
    ];

    const nav = navLinks.map((link) => (
        <li key={link.to}>
            <NavLink
                to={link.to}
                exact
                className={({ isActive }) =>
                    `text-lg font-semibold ${isActive
                        ? "text-blue-500 underline underline-offset-4 under hover:text-[#1F1717] text-[22px] hover:text-2xl"
                        : "text-black hover:text-[#1F1717] hover:text-2xl"
                    }`
                }
            >
                {link.label}
            </NavLink>
        </li>
    ));



    return (

        <div className="max-w-screen-xl mx-auto flex">
            {/* Dashboard side bar */}
            <div className="w-64 min-h-screen bg-[#D1A054]">
                <ul className="menu p-4">


                    <div className="divider">OR</div>
                    {/* shared nav link */}
                    <h1></h1>
                    <ul className="menu menu-vertical px-1 text-blue-800 ">
                        {nav}
                    </ul>
                </ul>
            </div>
            {/* Dashboard Content */}
            <div className="flex-1">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;