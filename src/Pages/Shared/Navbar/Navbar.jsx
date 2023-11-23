
import logo from "../../../assets/FNF.png"
import DefaultAvatar from "../../../assets/DefaultAvatar.jpeg"
import { NavLink } from "react-router-dom";

const Navbar = () => {
    // navbar things
    const navLinks = [
        { to: "/", label: "Home" },
        { to: "/gallery", label: "Gallery" },
        { to: "/trainer", label: "Trainer" },
        { to: "/classes", label: "Classes" },
        { to: "/dashboard", label: "Dashboard" },
        { to: "/forms", label: "forms" },
    ]
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
            <div className="navbar bg-[#BE3144]">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {nav}
                        </ul>
                    </div>
                    <img className="w-20" src={logo} alt="" />
                </div>
                <div className="navbar-center ml-96 hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {nav}
                    </ul>
                </div>
                <div className="navbar-end">
                    <div className="avatar flex gap-5">
                        <button className="btn mt-2">Login</button>
                        <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                            <img src={DefaultAvatar} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;