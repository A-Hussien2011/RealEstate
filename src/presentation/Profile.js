import React, {useState, useEffect} from 'react';
import {UID} from "../constants";
import firebase from "firebase/app";
import '../stylesheets/profile.css';

const Profile = () => {
    const [userData, setUserData] = useState(
        {
            firstName: "",
            lastName: "",
            phone: "",
            email: ""
        });
    const [estateData, setEstateData] = useState(
        {
            approved: false,
            address: "",
            area: "",
            city: "",
            country: "",
            description: "",
            floor: "",
            ownerId: "",
            price: "",
            rooms: "",
            images: []
        });


    useEffect(() => {
        let uid = window.localStorage.getItem(UID);
        firebase.database().ref(`/users/${uid}`).once('value', (snapshot) => {
            let userData = snapshot.val();
            setUserData(userData)
        });
        setEstateData({...estateData, ownerId: uid});
    }, []);


    async function addEstate() {
        firebase.database().ref(`/estates`).push(estateData)
    }

    return (
        <div className="MainContainer Profile">
            <div className={"dataFieldsContainer"}>
                <h1>Your profile</h1>
                <div className="dataField">
                    <div className="inputLabel">First name</div>
                    <input value={userData?.firstName} disabled/>
                </div>
                <div className="dataField">
                    <div className="inputLabel">Last name</div>
                    <input value={userData?.lastName} disabled/>
                </div>
                <div className="dataField">
                    <div className="inputLabel">Email</div>
                    <input value={userData?.email} disabled/>
                </div>
                <div className="dataField">
                    <div className="inputLabel">phone</div>
                    <input value={userData?.phone} disabled/>
                </div>
            </div>
            <hr/>
            <div className={"dataFieldsContainer"}>
                <h1>Sell a real estate</h1>
                <div className="dataField">
                    <div className="inputLabel">Address</div>
                    <input onChange={(e) => setEstateData({...estateData, address: e.target.value})}/>
                </div>
                <div className="dataField">
                    <div className="inputLabel">City</div>
                    <input onChange={(e) => setEstateData({...estateData, city: e.target.value})}/>
                </div>
                <div className="dataField">
                    <div className="inputLabel">Country</div>
                    <input onChange={(e) => setEstateData({...estateData, country: e.target.value})}/>
                </div>
                <div className="dataField">
                    <div className="inputLabel">Description</div>
                    <input onChange={(e) => setEstateData({...estateData, description: e.target.value})}/>
                </div>
                <div className="dataField">
                    <div className="inputLabel">Floor</div>
                    <input onChange={(e) => setEstateData({...estateData, floor: e.target.value})}/>
                </div>
                <div className="dataField">
                    <div className="inputLabel">Price</div>
                    <input onChange={(e) => setEstateData({...estateData, price: e.target.value})}/>
                </div>
                <div className="dataField">
                    <div className="inputLabel">Number of rooms</div>
                    <input onChange={(e) => setEstateData({...estateData, rooms: e.target.value})}/>
                </div>
                <div className="dataField">
                    <div className="inputLabel">Image source</div>
                    <input onChange={(e) => setEstateData({
                        ...estateData,
                        images: [e.target.value]
                    })}/>
                </div>
                <button onClick={addEstate}>Add Estate</button>
            </div>
        </div>
    );
};

export default Profile;
