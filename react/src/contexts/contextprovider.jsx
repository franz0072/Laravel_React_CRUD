import { createContext , useState, useContext, useEffect} from "react";


const StateContext = createContext({
    user: null,
    token: null,
    notification: null,
    setUser: () => {},
    setToken: () => {},
    setNotification: () => {}
});

export const ContextProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [notification, _setNotification] = useState("");
    // const [token, _setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));
    // const [token, _setToken] = useState(123);
    // const [token, _setToken] = useState(null);
    const [token,_setToken] = useState(localStorage.getItem('ACCESS_TOKEN'))

    const setNotification = (message) => {
        console.log("Notification set:", message); // Debugging
        _setNotification(message);
        setTimeout(() => {
            console.log("Notification cleared"); // Debugging
            _setNotification("");
        }, 5000);
    };
    

    const setToken = (token) => _setToken(token);
    if (token) {
        localStorage.setItem("ACCESS_TOKEN", token);
    } else {
        localStorage.removeItem("ACCESS_TOKEN");
    }

    return (
        <StateContext.Provider
            value={{
                user,
                token,
                notification, // ✅ Add notification to context
                setUser,
                setToken,
                setNotification
            }}
        >
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);
