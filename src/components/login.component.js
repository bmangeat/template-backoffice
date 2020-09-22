import React, { useState } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { useHistory } from "react-router-dom";


import AuthService from "../services/auth.service";

const required = value => {
    if ( !value ) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const Login = () => {
    const history = useHistory();

    const [ username, setUsername ] = useState( '' )
    const [ password, setPassword ] = useState( '' )
    const [ loginMessage, setLoginMessage ] = useState( '' )
    const [ loading, setLoading ] = useState( false )

    let loginForm = React.createRef()
    let checkBtn = React.createRef()

    const handleLogin = ( event ) => {
        event.preventDefault()

        setLoading( true )

        loginForm.validateAll()
        if ( checkBtn.context._errors.length === 0 ) {
            AuthService.login( username, password )
                .then(
                    () => {
                        history.push( "/profile" );
                        window.location.reload();
                    },
                    ( error ) => {
                        setLoading( false )
                        setLoginMessage(
                            (error.response &&
                                error.response.data &&
                                error.response.data.message) ||
                            error.message ||
                            error.toString()
                        )
                    }
                )
        } else {
            setLoading( false )
        }
    }

    return (
        <div className="col-md-12">
            <div className="card card-container">
                <img
                    src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                    alt="profile-img"
                    className="profile-img-card"
                />
                <Form onSubmit={handleLogin}
                      ref={c => {
                          loginForm = c
                      }}>
                    <div className="form-group">

                        <label htmlFor="username">Username</label>
                        <Input
                            type="text"
                            className="form-control"
                            name="username"
                            value={username}
                            onChange={( event ) => setUsername( event.target.value )}
                            validations={[ required ]}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <Input
                            type="password"
                            className="form-control"
                            name="password"
                            value={password}
                            onChange={( event ) => setPassword( event.target.value )}
                            validations={[ required ]}
                        />
                    </div>
                    <div className="form-group">
                        <button
                            className="btn btn-primary btn-block"
                            disabled={loading}
                        >
                            {loading && (
                                <span className="spinner-border spinner-border-sm"/>
                            )}
                            <span>Login</span>
                        </button>
                    </div>

                    {loginMessage && (
                        <div className="form-group">
                            <div className="alert alert-danger" role="alert">
                                {loginMessage}
                            </div>
                        </div>
                    )}
                    <CheckButton
                        style={{ display: "none" }}
                        ref={c => {
                            checkBtn = c
                        }}
                    />
                </Form>
            </div>
        </div>
    )
}

export default Login
