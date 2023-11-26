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


export const router = createBrowserRouter([
    {
        path: "/",
        element: <PublicLayout></PublicLayout>,
        // errorElement: <NotFound></NotFound>,
        children:[
            {
                path: '/',
                element:<Home></Home>,
            },
            {
                path: '/gallery',
                element:<Gallery></Gallery>,
            },
            {
                path: '/trainer',
                element:<Trainer></Trainer>,
            },
            {
                path: '/trainer/:id',
                element:<TrainerDetails></TrainerDetails>,
                loader: ({params}) => fetch(`http://localhost:5000/trainers/${params.id}`)
            },
            {
                path: '/trainerBooking/:id',
                element:<TrainerBooked></TrainerBooked>,
                loader: ({params}) => fetch(`http://localhost:5000/trainers/${params.id}`)
            },
            {
                path: '/beATrainer',
                element:<BeATrainer></BeATrainer>,
            },
            {
                path: '/payment',
                element:<Payment></Payment>,
            },
            {
                path: '/classes',
                element:<Classes></Classes>,
            },
            {
                path: '/addClasses',
                element:<AddClasses></AddClasses>,
            },
            {
                path: '/forms',
                element:<Forms></Forms>,
            },

            {
                path: '/signUp',
                element:<SignUp></SignUp>
            },
            {
                path: '/login',
                element: <Login></Login>
            }
        ]
    }
])