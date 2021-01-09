import React from 'react'
import { connect } from 'react-redux'
import Workspace from "./Workspace";
import Dashboard from "./Dashboard";
import { Switch, Route, Redirect } from "react-router-dom";
import Navigation from "./components/Navigation";
import LogIn from './components/LogIn'
import SignUp from './components/SignUp'

const App = () => {
    return (
        <div>
            <Switch>
                <Route path='/login' children={<LogIn/>} />
                <Route path='/signup' children={<SignUp/>} />
                <Route path="/workspace/:section" children={<div><Navigation/><Workspace/></div>} />
                <Route path="/workspace/">
                    <Redirect to={{pathname: "/workspace/Sales"}} />
                </Route>
                <Route path="/" children={<div><Navigation /><Dashboard /></div>} />
            </Switch>
        </div>
    )
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
