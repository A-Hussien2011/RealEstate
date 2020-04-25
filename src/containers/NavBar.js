/* eslint-disable */
import React, {Component} from 'react';
import '../stylesheets/NavBar.css'
import {UID} from "../constants";

class NavBar extends Component {
    constructor(props){
        super(props);
        this.state = {
            uid: null
        }
    }
    async componentDidMount(){
        let uid = window.localStorage.getItem(UID);
        await this.setState({uid});
        this.activateTab();
    }

    goTo =(page)=>{
        document.location.href = document.location.origin + "/" + page
    };
    signout = ()=>{
        window.localStorage.clear();
        document.location.href = document.location.origin;
    };
    activateTab =()=>{
        let current = document.location.pathname;
        current = current.substring(1, current.length);
        if(current === "") current = "home";
        current = current + "Tab";
        let elements = document.getElementsByClassName("tab");
        for(let i = 0; i < elements.length; i++){
            elements[i].className = "tab"
        }
        console.log(current);
        if(document.getElementById(current)) document.getElementById(current).className += " active"
    };
    render() {
        let {uid} = this.state;
        return (
            <div className={"NavBar"}>
                <div className="topnav" id="myTopnav">
                    <a id={"homeTab"} onClick={()=>this.goTo("")} className="tab active">Home</a>
                    <a id={"searchTab"} className="tab" onClick={()=>this.goTo("search")}>Real estates</a>
                    {!uid && <a id={"signinTab"} className="tab" onClick={()=>this.goTo("signin")}>Sign in</a>}
                    {!uid && <a id={"signupTab"} className="tab" onClick={()=>this.goTo("signup")} >Sign up</a>}
                    {uid && <a id={"profileTab"} className="tab" onClick={()=>this.goTo("profile")} >Profile</a>}
                    {uid && <a onClick={()=>this.signout()} >Sign out</a>}
                    <a className="icon">
                        <i className="fa fa-bars"></i>
                    </a>
                </div>
            </div>
        );
    }
}

export default NavBar;