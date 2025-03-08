import React, { useState, useEffect } from "react";
import axiosClient from "../axios-client"; // Import axios client
import { Link } from "react-router-dom";

const Users = () => {
    const [users, setUsers] = useState([]); // Place state inside the component
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getUsers();
    }, []);


const onDelete = (u) => {
    if (!window.confirm("Are you sure want to delete this user?")) {
        return
    }

    axiosClient.delete(`/users/${u.id}`)
        .then(() => {
            //TODO show notification
            getUsers()
        })
}

    const getUsers = () => {
        setLoading(true);
        axiosClient
            .get("/users")
            .then(({ data }) => {
                console.log("API Response:", data); // Debugging
                setLoading(false);
                setUsers(data.data); // Store fetched data
                console.log(data);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    return (
        <div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <h1>Users</h1>
                <Link to="/users/create" className="btn-add">
                    Add New
                </Link>
                {/* {loading ? <p>Loading...</p> : <pre>{JSON.stringify(users, null, 2)}</pre>} */}
            </div>

            <div className="card animated fadeInDDown">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th>CREATE DATE</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(u => (
                            <tr key={u.id}>
                                <td>{u.id}</td>
                                <td>{u.name}</td>
                                <td>{u.email}</td>
                                <td>{u.created_at}</td>
                                <td>
                                    <Link className="btn-edit" to={`/users/${u.id}`}>Edit</Link>
                                    &nbsp;
                                    <button  onClick={ev => onDelete(u)}className="btn-delete">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Users;
