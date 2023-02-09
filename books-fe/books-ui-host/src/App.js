import React from "react";
import Login from "./Login";

const RemoteApp = React.lazy(() => import("Remote/App"));

export const App = () => {
    const [user, setUser] = React.useState(null);
    const [token, setToken] = React.useState(null);

    const sendCurrentUser = (user) => {
        console.log(user);
        setUser(user);
    };

    const sendToken = (token) => {
        console.log(token);
        setToken(token);
    };

    let component;
    if (user == null) {
        component = (<Login sendCurrentUser={sendCurrentUser} sendToken={sendToken}/>)
    } else {
        component = (<RemoteApp user={user} token={token}/>)
    }
    return component;

};
export default App;
