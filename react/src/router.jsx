import {createBrowserRouter} from "react-router-dom";
import Login from "./Views/Login"
import Signup from "./Views/Signup"
import Users from "./Views/Users"
import NotFound from "./Views/NotFound"
import Dashboard from "./Views/Dashboard"
import GuestLayout from "./components/GuestLayout"
import DefaultLayout from "./components/DefaultLayout"
import UserForm from "./views/UserForm"



const router = createBrowserRouter([
    {
        path:'/',
        element: <DefaultLayout />,
        children: [
            {
                path: '/',  
                element: <Users />
        
            },
            {
                path: '/dashboard',
                element: <Dashboard  />
        
            },
            {
                path: '/users/:id',
                element: <UserForm key="userCreate"/>
        
            },
            {
                path: '/users/new',
                element: <UserForm key="userUpdate"/>
        
            },
        ]
    },
    {
        path:'/',
        element: <GuestLayout />,
        children: [
            {
                path: '/login',
                element: <Login />
        
            },
            {
                path: '/signup',
                element: <Signup />
        
            },
        ]
    },
    
    
    {
        path: '*',
        element: <NotFound />

    }

]);

export default router;