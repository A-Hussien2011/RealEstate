import React, {Component} from 'react';
import firebase from 'firebase';
import {UID} from "../constants";
import {USER} from "../constants";

class SignUp extends Component {

    constructor(props) {
        super(props);
        let state = {
            firstName: "",
            lastName: "",
            phone: "",
            email: "",
            password: ""
        };
    }

    signUpUser = () => {
        let {firstName, lastName, phone, email, password} = this.state;
        let user = {firstName, lastName, phone, email, type: USER};
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(async (response) => {
            const res = response.user.toJSON();
            await firebase.database().ref(`/users/${res.uid}`).set(user);
            let myStorage = window.localStorage;
            myStorage.setItem(UID,res.uid);
            document.location.href = document.location.origin
        })
        .catch(function (error) {
            // var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage)
        });

    };

    render() {
        return (
            <div className={"MainContainer SignUp"}>
                <div className="login-page">
                    <div className="form">
                        <div className="register-form">
                            <input onChange={(event) => {
                                this.setState({firstName: event.target.value});
                            }} type="text" placeholder="First name"/>
                            <input onChange={(event) => {
                                this.setState({lastName: event.target.value});
                            }} type="text" placeholder="Last name"/>
                            <input onChange={(event) => {
                                this.setState({phone: event.target.value});
                            }} type="text" placeholder="Phone"/>
                            <input onChange={(event) => {
                                this.setState({email: event.target.value});
                            }} type="text" placeholder="email address"/>
                            <input onChange={(event) => {
                                this.setState({password: event.target.value});
                            }} type="password" placeholder="password"/>
                            <button onClick={this.signUpUser}>create</button>
                            <p className="message">Already registered? <a href="signin">Sign In</a></p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SignUp;