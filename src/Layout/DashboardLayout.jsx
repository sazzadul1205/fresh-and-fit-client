import { NavLink, Outlet } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const Dashboard = () => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();

    const { data: myAccount = [], isLoading: isUserLoading } = useQuery({
        queryKey: ['myAccount'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/users?email=${user?.email}`);
            return res.data;
        },
    });

    if (isUserLoading) {
        return <p>Loading...</p>;
    }

    const navLinks = [
        { to: "/", label: "Home" },
        { to: "/gallery", label: "Gallery" },
        { to: "/trainer", label: "Trainer" },
        { to: "/classes", label: "Classes" },
        { to: "/forms", label: "Forms" },
    ];

    const userNavLink = [
        { to: "activityLog", label: "Activity Log" },
        { to: "profileSettings", label: "Profile Settings" },
        { to: "recClassesPage", label: "Recommended Classes Page" },
        { to: "addTestimonials", label: "Add Testimonials" },
        { to: "aboutUs", label: "About Us" },
    ];

    const trainerNavLink = [
        { to: "manageSlots", label: "Manage Slots" },
        { to: "manageMember", label: "Manage member" },
        { to: "addNewForum", label: "Add new Forum" },
        { to: "addNewClasses", label: "Add new Class" },
    ];

    const AdminNavLink = [
        { to: "allSubscribers", label: "All subscribers" },
        { to: "allTrainers", label: "All Trainers:" },
        { to: "appliedTrainer", label: "Applied Trainer:" },
        { to: "balance", label: "Balance" },
        { to: "addNewForum", label: "Add new Forum" },
    ];

    const nav = navLinks.map((link) => (
        <li key={link.to}>
            <NavLink
                to={link.to}
                exact
                className={({ isActive }) =>
                    `text-lg font-semibold ${isActive
                        ? "bg-blue-500 underline underline-offset-4 under hover:text-[#1F1717] text-[22px] hover:text-2xl"
                        : "text-black hover:text-[#1F1717] hover:text-2xl"
                    }`
                }
            >
                {link.label}
            </NavLink>
        </li>
    ));

    const role = myAccount?.role;

    const adminNav = role === 'admin' && AdminNavLink.map((link) => (
        <li key={link.to}>
            <NavLink
                to={link.to}
                exact
                className={({ isActive }) =>
                    `text-lg font-semibold ${isActive
                        ? "text-red-500 bg-red-200 hover:bg-purple-500  text-[22px] hover:text-2xl"
                        : "text-black hover:text-[#1F1717] hover:bg-purple-500  hover:text-2xl"
                    }`
                }
            >
                {link.label}
            </NavLink>
        </li>
    ));

    const trainerNav = role === 'trainer' && trainerNavLink.map((link) => (
        <li key={link.to}>
            <NavLink
                to={link.to}
                exact
                className={({ isActive }) =>
                    `text-lg font-semibold ${isActive
                        ? "text-red-500 bg-red-200 hover:bg-purple-500  text-[22px] hover:text-2xl"
                        : "text-black hover:text-[#1F1717] hover:bg-purple-500  hover:text-2xl"
                    }`
                }
            >
                {link.label}
            </NavLink>
        </li>
    ));

    const userNav = role === 'member' && userNavLink.map((link) => (
        <li key={link.to}>
            <NavLink
                to={link.to}
                exact
                className={({ isActive }) =>
                    `text-lg font-semibold ${isActive
                        ? "text-red-500 bg-red-200 hover:bg-purple-500  text-[22px] hover:text-2xl"
                        : "text-black hover:text-[#1F1717] hover:bg-purple-500  hover:text-2xl"
                    }`
                }
            >
                {link.label}
            </NavLink>
        </li>
    ));

    return (
        <div className="flex w-[1200px] mx-auto">
            {/* Dashboard side bar */}
            <div className="w-64 min-h-screen bg-red-500 pt-10 fixed">
                <h1 className="text-center text-2xl font-bold text-blue-800 ">Dashboard</h1>
                <ul className="menu p-4">
                    <ul className="menu menu-vertical px-1 text-blue-800 ">
                        {adminNav}
                        {trainerNav}
                        {userNav}
                    </ul>

                    <div className="divider">OR</div>
                    {/* shared nav link */}
                    <h1></h1>
                    <ul className="menu menu-vertical px-1 text-blue-800 ">
                        {nav}
                    </ul>
                </ul>
            </div>
            {/* Dashboard Content */}
            <div className="flex-1 ml-64 overflow-y-auto bg-gray-500 min-h-screen">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;
