import React, { useRef,useState} from "react";
import { Link } from "react-router-dom";
import { useStateContext } from "../contexts/contextprovider";
import axiosClient from "../axios-client.js";



const Login = () => {

    const emailRef = useRef();
    const passwordRef = useRef();
    const [errors , setErrors] = useState(null)

    const { setUser, setToken } = useStateContext();

    const onSubmit = (ev) => {
        ev.preventDefault()

        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };
        console.log(payload);
        setErrors(null);
        axiosClient
            .post("/login", payload)
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

                    if(response.data.errors){
                    console.log(response.data.errors);
                    setErrors(response.data.errors);
                }else{
                    setErrors({
                        email:[response.data.message]
                    })
                }

                }
            });

    }

    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <form onSubmit={onSubmit}>
                    <h1 className="title">
                        Login Into Your Account
                    </h1>

                    {errors && <div className="alert">
                            {Object.keys(errors).map(key=>(
                                <p key={key}>{errors[key][0]}</p>
                            ))}
                            </div>
                            }


                    <input ref={emailRef} type="email" placeholder = "Email" />
                    <input ref={passwordRef} type="password" placeholder = "Password" />
                    <button className="btn btn-block">Login</button>
                    <p className="message">
                        Not Registered? <Link to="/signup">Create an account </Link>
                    </p>

                </form>
            </div>
        {/* Login */}
        </div>
    );
}

export default Login;
