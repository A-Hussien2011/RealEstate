import React, {Component} from 'react';
import '../stylesheets/SignForms.css';
import firebase from 'firebase';
import {ADMIN, UID} from "../constants";

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.email = "";
        this.password = ""
    }

    signInUser = () => {
        firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        .then((response) => {
            let myStorage = window.localStorage
            const res = response.user.toJSON();
            myStorage.setItem(UID,res.uid);
            firebase.database().ref(`/users/${res.uid}`).once('value',(snapshot)=>{
                let accessType = snapshot.val().type;
                if(accessType === ADMIN){
                    document.location.href = document.location.origin + "/admin";
                } else {
                    document.location.href = document.location.origin;
                }
            });
        })
        .catch(function (error) {
            // Handle Errors here.
            // var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage)
        });
    };

    render() {

        return (
            <div className="MainContainer SignIn">
                <div className="login-page">
                    <div className="form">
                        <div className="login-form">
                            <input onChange={(event) => {
                                this.email = event.target.value
                            }} type="email" placeholder="Email"/>
                            <input onChange={(event) => {
                                this.password = event.target.value
                            }} type="password" placeholder="password"/>
                            <button onClick={this.signInUser}>login</button>
                            <p className="message">Not registered? <a href="signup">Create an account</a></p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SignIn;