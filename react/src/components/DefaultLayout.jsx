import React from 'react';
import {Link,Navigate,Outlet} from "react-router-dom"
import {useStateContext} from "../contexts/contextprovider"
import {useEffect} from 'react';
import axiosClient from "../axios-client.js"



const DefaultLayout = () => {

    const {user , token ,setUser ,setToken} = useStateContext()

    if (!token)
    {
        return <Navigate to="/login" />
    }

    const onLogout = (ev) => { //ev means event
        ev.preventDefault()

        axiosClient.post('/logout')
            .then(()=>{
                setUser({})
                setToken(null)
            })
    }

    useEffect(() => {
        axiosClient.get('/user')
            .then(({data}) => {
                setUser(data)
                
            })
    }, [])

    return (
        <div id="defaultLayout">
             <aside>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/Users">Users</Link>

            </aside>

            <div className="content">
                <header>
                    <div>
                        Header
                    </div>
                    <div>
                        {user.name}
                        <a href="#" onClick={onLogout} className="btn-logout">Logout</a>
                    </div>
                </header>
                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default DefaultLayout;
