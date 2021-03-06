import React, { useState, useEffect } from "react"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css'
import "../App.css"

// Import services
import AuthService from "../services/auth.service"

// Import components
import Login from "./login.component"
import Register from "./register.component"
import Home from "./home.component"
import Profile from "./profile.component"
import UserBoard from "./board-user.component"
import AdminBoard from "./board.admin.component"
import ModBoard from "./board.moderator.component"

const App = () => {
    useEffect( () => {
        const user = AuthService.getCurrentUser()
        if ( user ) {
            setCurrentUser( user )
            setShowModeratorBoard( user.roles.includes( "ROLE_MODERATOR" ) )
            setShowAdminBoard( user.roles.includes( "ROLE_ADMIN" ) )
        }
    }, [] )

    const [ showModeratorBoard, setShowModeratorBoard ] = useState( false )
    const [ showAdminBoard, setShowAdminBoard ] = useState( false )
    const [ currentUser, setCurrentUser ] = useState( undefined )


    return (
        <Router>
            <div>
                <nav className="navbar navbar-expand navbar-dark bg-dark">
                    <Link to={"/"} className="navbar-brand"/>
                    <div className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to={"/home"} className="nav-link">
                                Home
                            </Link>
                        </li>
                        {showModeratorBoard && (
                            <li className="nav-item">
                                <Link to={"/mod"} className="nav-link">
                                    Moderator Board
                                </Link>
                            </li>
                        )}
                        {showAdminBoard && (
                            <li className="nav-item">
                                <Link to={"/admin"} className="nav-link">
                                    Admin Board
                                </Link>
                            </li>
                        )}
                        {currentUser && (
                            <li className="nav-item">
                                <Link to={"/user"} className="nav-link">
                                    User
                                </Link>
                            </li>
                        )}
                    </div>

                    {currentUser ? (
                        <div className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to={"/profile"} className="nav-link">
                                    {currentUser.username}
                                </Link>
                            </li>
                            <li className="nav-item">
                                <a href="/login" className="nav-link" onClick={AuthService.logout}>
                                    LogOut
                                </a>
                            </li>
                        </div>
                    ) : (
                        <div className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to={"/login"} className="nav-link">
                                    Login
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link to={"/register"} className="nav-link">
                                    Sign Up
                                </Link>
                            </li>
                        </div>
                    )}
                </nav>

                <div className="container mt-3">
                    <Switch>
                        <Route exact path={[ "/", "/home" ]} component={Home}/>
                        <Route exact path="/login" component={Login}/>
                        <Route exact path="/register" component={Register}/>
                        <Route exact path="/profile" component={Profile}/>
                        <Route path="/user" component={UserBoard}/>
                        <Route path="/mod" component={ModBoard}/>
                        <Route path="/admin" component={AdminBoard}/>
                    </Switch>
                </div>
            </div>
        </Router>
    )
}

export default App
