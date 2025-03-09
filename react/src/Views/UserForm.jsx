import React, { useState, useEffect, createContext, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axios-client"; // Import axios client
import { useStateContext } from "../contexts/contextprovider"; // Correct path


const UserForm = () => {
    const { id } = useParams();
    const navigate = useNavigate(); // ✅ Removed unnecessary `useNavigate();` call
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);
    const {setNotification} = useStateContext()

    const [user, setUser] = useState({
        id: null,
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    // Fetch user data if ID exists
    useEffect(() => {
        if (id && !isNaN(id)) { // Fetch only if id is a valid number
            setLoading(true);
            axiosClient
                .get(`/users/${id}`)
                .then(({ data }) => {
                    setLoading(false);
                    // debugger;
                    setUser(data);
                })
                .catch((error) => {
                    setLoading(false);
                    setErrors(
                        error.response?.data?.errors || "Failed to fetch user"
                    );
                });
        }
    }, [id]); // Dependency added to avoid infinite re-renders

    const onSubmit = (ev) => {
        ev.preventDefault();
        // Handle form submission logic
        if (user.id) {
            axiosClient
                .put(`users/${user.id}`, user)
                .then(() => {
                    setNotification("User was successfully updated")
                    navigate("/users");
                })
                .catch((err) => {
                    // console.log(err);
                    const response = err.response;
                    console.log(response); // Log the entire response to inspect it
                    if (response && response.status === 422) {
                        console.log(response.data.errors);
                        setErrors(response.data.errors);
                    }
                });
        } else {
            axiosClient
                .post(`/users`, user)
                .then(() => {
                    setNotification("User was successfully Created")
                    navigate("/users");
                })
                .catch((err) => {
                    // console.log(err);
                    const response = err.response;
                    console.log(response); // Log the entire response to inspect it
                    if (response && response.status === 422) {
                        console.log(response.data.errors);
                        setErrors(response.data.errors);
                    }
                });
        }
    };

    return (
        <div>
            {user.id ? <h1>Update User: {user.name}</h1> : <h1>New User</h1>}

            <div className="card animate fadeInDown">
                {loading && <div className="text-center">Loading..</div>}

                {errors && (
                    <div className="alert">
                        {Object.keys(errors).map((key) => (
                            <p key={key}>{errors[key][0]}</p>
                        ))}
                    </div>
                )}

                {!loading && (
                    <form onSubmit={onSubmit}>
                        <input
                            onChange={(ev) =>
                                setUser({ ...user, name: ev.target.value })
                            }
                            value={user.name}
                            placeholder="Name"
                        />
                        <input
                            onChange={(ev) =>
                                setUser({ ...user, email: ev.target.value })
                            }
                            value={user.email}
                            placeholder="Email"
                            type="email"
                        />
                        <input 
                            onChange={(ev) =>
                                setUser({ ...user, password: ev.target.value })
                            }
                            value={user.password}
                            placeholder="Password"
                            type="password"
                        />
                        <input
                            onChange={(ev) =>
                                setUser({
                                    ...user,
                                    password_confirmation: ev.target.value,
                                })
                            }
                            value={user.password_confirmation}
                            placeholder="Password Confirmation"
                            type="password"
                        />
                        <button className="btn">Save</button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default UserForm;
