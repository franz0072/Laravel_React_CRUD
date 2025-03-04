import React, { useRef,useState} from "react";
import { Link } from "react-router-dom";
import { useStateContext } from "../contexts/contextprovider";
import axiosClient from "../axios-client.js";

const Signup = () => {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();
    const [errors , setErrors] = useState(null)

    const { setUser, setToken } = useStateContext();

    // const {} = useStateContext()

    const onSubmit = (ev) => {
        // debugger;
        ev.preventDefault();
        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
        };
        console.log(payload);
        axiosClient
            .post("/signup", payload)
            .then(({ data }) => {
                // ✅ Destructure response correctly
                setUser(data.user);
                setToken(data.token);
            })

            .catch((err) => {
                // console.log(err);
                const response = err.response;
                console.log(response);  // Log the entire response to inspect it
                if (response && response.status === 422) {
                    console.log(response.data.errors);
                    setErrors(response.data.errors);

                }
            });
    };
    return (
        <div>
            <div className="login-signup-form animated fadeInDown">
                <div className="form">
                    <form onSubmit={onSubmit}>
                        <h1 className="title">Sign Up for Free</h1>

                        {errors && <div className="alert">
                            {Object.keys(errors).map(key=>(
                                <p key={key}>{errors[key][0]}</p>
                            ))}
                            </div>
                            }

                        <input
                            type="text"
                            ref={nameRef}
                            placeholder="Full Name"
                            defaultValue=""
                        />
                        <input
                            type="email"
                            ref={emailRef}
                            placeholder="Email Address"
                            defaultValue=""
                        />
                        <input
                            type="password"
                            ref={passwordRef}
                            placeholder="Password"
                            defaultValue=""
                        />
                        <input
                            type="password"
                            ref={passwordConfirmationRef}
                            placeholder="Password Confirmation"
                            defaultValue=""
                        />

                        <button className="btn btn-block">Signup</button>
                        <p className="message">
                            Already Registered?{" "}
                            <Link to="/login">Sign in </Link>
                        </p>
                    </form>
                </div>
                {/* Login */}
            </div>
        </div>
    );
};

export default Signup;