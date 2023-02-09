import React, {useState} from 'react';
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const Login = ({sendCurrentUser, sendToken}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const login = () => {
        console.log('user');

        if (username === '' || password === '') {
            this.setState({error: 'Invalid data.'});
        } else {
            const url_api = 'http://localhost:8092/gate/v1/login';
            console.log(`Sending request: ${url_api}`);

            fetch(url_api, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "username": username,
                    "password": password
                })
            }).then(response => response.json())
                .then(data => {
                    const api_error = data.error;
                    if (typeof api_error == 'undefined') {
                        console.log("Password is correct.");
                        sendCurrentUser(username);
                        sendToken(data.token)
                    } else {
                        console.log(api_error);
                    }
                }).catch((err) => {
                console.log(`Error API call: ${err}`);
            });
        }
    };

    return (
        <div style={{padding: 50}}>
            <Paper>
                <Grid
                    container
                    spacing={3}
                    direction={'column'}
                    justify={'center'}
                    alignItems={'center'}
                >
                    <Grid item xs={12}>
                        <TextField label="Username" name="username"
                                   onChange={(event) => setUsername(event.target.value)}/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label="Password" name="password" type={'password'}
                                   onChange={(event) => setPassword(event.target.value)}/>
                    </Grid>
                    <Grid item xs={12}>
                        <Button fullWidth onClick={login}> Login </Button>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
};

export default Login;
