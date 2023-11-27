import { createBrowserRouter } from "react-router-dom";
import PublicLayout from "../Layout/PublicLayout";
import Home from "../Pages/Home/Home/Home";
import SignUp from "../Pages/SignUp/SignUp";
import Login from "../Pages/Login/Login";
// import NotFound from "../Pages/NotFound/NotFound";
import Gallery from "../Pages/Gallery/Gallery/Gallery";
import Trainer from "../Pages/Trainer/Trainer/Trainer";
import TrainerDetails from "../Pages/TrainerDetails/TrainerDetails";
import BeATrainer from "../Pages/BeATrainer/BeATrainer";
import TrainerBooked from "../Pages/TrainerBooked/TrainerBooked";
import Payment from "../Pages/Payment/Payment";
import Classes from "../Pages/Classes/Classes";
import AddClasses from "../Pages/AddClasses/AddClasses";
import Forms from "../Pages/Forms/Forms";
import PrivateRoutes from "./PrivateRoutes";
import Dashboard from "../Layout/DashboardLayout";
import DashboardHome from "../Dashboard/DashboardHome/DashboardHome";
import AllSubscribers from "../Dashboard/Admin/AllSubscribers/AllSubscribers";
import AllTrainers from "../Dashboard/Admin/AllTrainers/AllTrainers";
import TrainerPayment from "../Dashboard/Admin/TrainerPayment/TrainerPayment";
import AppliedTrainer from "../Dashboard/Admin/AppliedTrainer/AppliedTrainer";
import Balance from "../Dashboard/Admin/Balance/Balance";
import ManageSlots from "../Dashboard/Trainer/ManageSlots/ManageSlots";
import ManageMember from "../Dashboard/Trainer/ManageMember/ManageMember";
import AddNewForm from "../Dashboard/AddNewForm/AddNewForm";
import AddNewClasses from "../Dashboard/Trainer/AddNewClasses/AddNewClasses";
import ActivityLog from "../Dashboard/Member/ActivityLog/ActivityLog";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <PublicLayout></PublicLayout>,
        // errorElement: <NotFound></NotFound>,
        children: [
            {
                path: '/',
                element: <Home></Home>,
            },
            {
                path: '/gallery',
                element: <Gallery></Gallery>,
            },
            {
                path: '/trainer',
                element: <Trainer></Trainer>,
            },
            {
                path: '/trainer/:id',
                element: <TrainerDetails></TrainerDetails>,
                loader: ({ params }) => fetch(`http://localhost:5000/trainers/${params.id}`)
            },
            {
                path: '/trainerBooking/:id',
                element: <TrainerBooked></TrainerBooked>,
                loader: ({ params }) => fetch(`http://localhost:5000/trainers/${params.id}`)
            },
            {
                path: '/beATrainer',
                element: <PrivateRoutes><BeATrainer></BeATrainer></PrivateRoutes>,
            },
            {
                path: '/payment',
                element: <PrivateRoutes><Payment></Payment></PrivateRoutes>,
            },
            {
                path: '/classes',
                element: <Classes></Classes>,
            },
            {
                path: '/addClasses',
                element: <AddClasses></AddClasses>,
            },
            {
                path: '/forms',
                element: <Forms></Forms>,
            },

            {
                path: '/signUp',
                element: <SignUp></SignUp>
            },
            {
                path: '/login',
                element: <Login></Login>
            }
        ]
    },
    {
        path: `/dashboard`,
        element: <Dashboard></Dashboard>,
        children: [
            {
                path: '/dashboard',
                element: <DashboardHome></DashboardHome>
            },
            {
                path: 'addNewForum',
                element: <AddNewForm></AddNewForm>
            },
            // admin
            {
                path: 'allSubscribers', 
                element: <AllSubscribers></AllSubscribers>
            },
            {
                path: 'allTrainers', 
                element: <AllTrainers></AllTrainers>
            },
            {
                path: 'trainerPayment/:id',
                element: <TrainerPayment></TrainerPayment>,
                loader: ({ params }) => fetch(`http://localhost:5000/trainers/${params.id}`)
            },
            {
                path: 'appliedTrainer',
                element: <AppliedTrainer></AppliedTrainer>
            },
            {
                path: 'balance',
                element: <Balance></Balance>
            },
            // trainer
            {
                path: 'manageSlots',
                element: <ManageSlots></ManageSlots>
            },
            {
                path: 'manageMember',
                element: <ManageMember></ManageMember>
            },
            {
                path: 'addNewClasses',
                element: <AddNewClasses></AddNewClasses>
            },
            //  Member
            {
                path: 'activityLog',
                element: <ActivityLog></ActivityLog>
            },
            {
                path: ''
            }
            

        ]
    }
])