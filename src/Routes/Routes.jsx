import { createBrowserRouter } from "react-router-dom";
import PublicLayout from "../Layout/PublicLayout";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <PublicLayout></PublicLayout>
    }
])