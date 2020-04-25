import React, {Component} from 'react';
import LandingPage from "./presentation/LandingPage";
import NavBar from "./containers/NavBar";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Search from "./containers/Search";
import SignIn from "./containers/SignIn";
import SignUp from "./containers/SignUp";
import Profile from "./presentation/Profile";
import DashBoard from "./containers/DashBoard";
import firebase from 'firebase/app';
import {createRole, a, an, check} from './acl/index';
import EstateDetails from "./presentation/EstateDetails";
import Admin from "./containers/Admin";

class App extends Component {

    UNSAFE_componentWillMount(){
        this.testACL();
        const config = {
            apiKey: "AIzaSyAG_hJEXW7UsImFB_t2_-xA_IpUDSSbPPQ",
            authDomain: "sw-eng-real-estate.firebaseapp.com",
            databaseURL: "https://sw-eng-real-estate.firebaseio.com",
            projectId: "sw-eng-real-estate",
            storageBucket: "sw-eng-real-estate.appspot.com",
            messagingSenderId: "939640053238",
            appId: "1:939640053238:web:68b93e92c373bd8e73bbd7",
            measurementId: "G-6J30C5SLXF"
        };
        firebase.initializeApp(config);
    }

    componentDidMount (){

    };

    testACL =()=>{
        createRole('admin');
        createRole('user');
        createRole('guest');

        an('admin').can('get').from('/users');
        an('admin').can('post').to('/users');

        a('user').can('post').to('/users/:userID/articles').when((params, user)=>{
            return user.id === params.userID
        });

        a('guest').can('get').from('/articles');

        console.log("guest post to /users ", check.if('guest').can('post').to('/users').isValid);
        console.log("admin post to /users ", check.if('admin').can('post').to('/users').isValid);
        console.log("user post to /users/10/articles condition id = 10 ", check.if('user').can('post').to('/users/10/articles').when({id: "10"}));
    };

    render() {
        return (
            <div>
                <NavBar/>
                <Router>
                    <Route exact path="/" component={LandingPage}/>
                    <Route exact path="/search/:searchTerm" component={Search} />
                    <Route exact path="/search" component={Search} />
                    <Route path="/signin" component={SignIn} />
                    <Route path="/signup" component={SignUp} />
                    <Route path="/dashboard" component={DashBoard} />
                    <Route path="/profile" component={Profile} />
                    <Route path="/estateDetails" component={EstateDetails} />
                    <Route path="/admin" component={Admin} />
                </Router>
            </div>
        );
    }
}

export default App;