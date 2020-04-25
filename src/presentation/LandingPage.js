import React from 'react';

function LandingPage() {
    let searchterm = "";
    function search (){
        document.location.href = document.location.origin + "/search/" + searchterm
        // console.log(searchterm)
    };
    return (
        <div className="MainContainer LandingPage">
            <div className={"searchDiv"}>
                <input onChange={(event)=>{searchterm = event.target.value}} placeholder={"Enter estate name"}/>
                <button onClick={search}>Search</button>
            </div>
        </div>
    );
}

export default LandingPage;