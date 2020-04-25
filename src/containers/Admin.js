import React, {Component} from 'react';
import firebase from "firebase";
import {ADMIN, UID} from "../constants";

class Admin extends Component {
    constructor(props){
        super(props);
        this.state = {
            view: "Estates"
        }
    }
    UNSAFE_componentWillMount(){
        let uid = window.localStorage.getItem(UID);
        firebase.database().ref(`/users/${uid}`).once('value', (snapshot) => {
            let userData = snapshot.val();
            if (userData.type !== ADMIN) {
                alert("Unauthorized access");
            } else {
                firebase.database().ref(`/estates/`).on('value',(snapshot)=>{
                    let estates = {};
                    snapshot.forEach((child) => {
                        console.log(child.key, child.val());
                        if(!child.val().approved){
                            estates[child.key] = child.val();
                        }
                    });
                    this.setState({estates})
                });
                firebase.database().ref(`/users/`).on('value',(snapshot)=>{
                    let users = snapshot.val();
                    this.setState({users})
                });
            }
        });
    }
    estateApproval =(key, approval)=>{
        if(approval){
            firebase.database().ref(`/estates/${key}/approved`).set(approval)
        } else {
            firebase.database().ref(`/estates/${key}`).remove()
        }
    };

    userApproval =(key, approval)=>{
        if(approval){
            firebase.database().ref(`/users/${key}/approved`).set(approval)
        } else {
            firebase.database().ref(`/users/${key}`).remove()
        }
    };


    renderEstates = ()=>{
        let {estates} = this.state;
        if(!estates){
            return <h1>Loading ...</h1>
        } else {
            const items = Object.entries(estates).map((entry)=>{
                let key = entry[0];
                let item = entry[1];

                return (
                    <div className={"estateCard"} key={item.address}>
                        <div className={"estateImage"}>
                            <img src={item.images? item.images[0]: ""}/>
                        </div>
                        <div className={"estateContent"}>
                            <div>
                                <p>{item.description}</p>
                            </div>
                            <div>
                                <h1>{item.address}</h1>
                                <h1>{item.price} LE</h1>
                            </div>
                            <div>
                                <h1>Rooms: {item.rooms}</h1>
                                <h1>Floor: {item.floor}</h1>
                            </div>
                            <div>
                                <button onClick={()=>this.estateApproval(key, true)}>Approve</button>
                                <button style={{backgroundColor:"red"}} onClick={()=>this.estateApproval(key, false)}>Decline</button>
                            </div>

                        </div>
                    </div>
                )
            });
            return <div>{items}</div>
        }
    };
    renderUsers =()=>{
        let {users} = this.state;
        if(!users){
            return <h1>Loading ...</h1>
        } else {
            const items = Object.entries(users).map((entry)=>{
                let key = entry[0];
                let item = entry[1];

                return (
                    <div className={"estateCard"} key={item.address}>
                        <div className={"estateContent"}>
                            <div>
                                <h1>{item.firstName}</h1>
                                <h1>{item.lastName}</h1>
                            </div>
                            <div>
                                <h1>{item.phone}</h1>
                                <h1>{item.email} LE</h1>
                            </div>
                            <div>
                                <button onClick={()=>this.userApproval(key, true)}>Approve</button>
                                <button style={{backgroundColor:"red"}} onClick={()=>this.userApproval(key, false)}>Decline</button>
                            </div>

                        </div>
                    </div>
                )
            });
            return <div>{items}</div>
        }
    };
    render() {
        let {view} = this.state;
        return (
            <div className={"MainContainer Admin"}>
                <div>
                    <select onChange={(e)=>this.setState({view: e.target.value})}>
                        <option>Estates</option>
                        <option>Users</option>
                    </select>
                </div>
                <div>
                    {view === "Estates"? this.renderEstates(): this.renderUsers()}
                </div>
            </div>
        );
    }
}

export default Admin;