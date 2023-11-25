import { createBrowserRouter } from "react-router-dom";
import PublicLayout from "../Layout/PublicLayout";
import Home from "../Pages/Home/Home/Home";
import SignUp from "../Pages/SignUp/SignUp";
import Login from "../Pages/Login/Login";
// import NotFound from "../Pages/NotFound/NotFound";
import Gallery from "../Pages/Gallery/Gallery/Gallery";


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