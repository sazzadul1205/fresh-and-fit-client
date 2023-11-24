import logo from "../../../assets/FNF.png";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import { motion } from "framer-motion";

const Navbar = () => {
    const { user, logOut } = useAuth();

    const handleSignOut = () => {
        logOut()
            .then(() => {
                console.log("User signed out successfully.");
            })
            .catch(error => {
                console.error("Error signing out:", error);
            });
    };

    // Navbar links
    const navLinks = [
        { to: "/", label: "Home" },
        { to: "/gallery", label: "Gallery" },
        { to: "/trainer", label: "Trainer" },
        { to: "/classes", label: "Classes" },
        { to: "/dashboard", label: "Dashboard" },
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
        <div>
            <div className="navbar fixed z-50 max-w-[1200px] bg-red-500 opacity-90">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden text-black">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>

                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {nav}
                        </ul>
                    </div>
                    <a className="hidden lg:inline-block">
                        <img className="w-20" src={logo} alt="https://i.ibb.co/QKSVWrJ/head-icon.png" />
                    </a>
                </div>

                <div className="navbar-center hidden ml-40 lg:flex">
                    <ul className="menu menu-horizontal px-1 text-blue-800 ">
                        {nav}
                    </ul>
                </div>

                <div className="navbar-end mr-5 flex items-center">
                    {user ? (
                        <>
                            <div className="avatar flex-col mr-5">
                                <div className="w-14 h-14 rounded-full ring ring-primary mx-auto">
                                    <img src={user?.photoURL} alt="User Avatar" className="object-cover rounded-full" />
                                </div>
                                <h2 className="text-sm text-center">{user?.displayName}</h2>
                            </div>

                            <motion.button
                                className={`w-28 p-3 bg-[#001B79] hover:bg-blue-700 rounded-xl`} onClick={handleSignOut}
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.9 }}
                                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                            >
                                Log Out
                            </motion.button>
                        </>
                    ) : (
                        <Link to="/login">
                            <motion.button
                                className={`w-28 p-3 bg-[#001B79] hover:bg-blue-700 rounded-xl`} onClick={handleSignOut}
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.9 }}
                                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                            >
                                Log In
                            </motion.button>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
