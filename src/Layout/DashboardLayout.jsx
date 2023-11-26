import { Outlet } from "react-router-dom";
const Dashboard = () => {


    return (

        <div className="max-w-screen-xl mx-auto flex">
            {/* Dashboard side bar */}
            <div className="w-64 min-h-screen bg-[#D1A054]">
                <ul className="menu p-4">
                   

                    <div className="divider">OR</div>
                    {/* shared nav link */}
                    

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