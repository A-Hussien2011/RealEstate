import React, {Component} from 'react';
import firebase from 'firebase/app';
import '../stylesheets/estateSearch.css'

export default class Search extends Component {
    constructor(props){
        super(props);
        this.state = {
            estates: [],
            searchTerm: ""
        }
    }

    UNSAFE_componentWillMount(){
        firebase.database().ref(`/estates/`).on('value',(snapshot)=>{
            let estates = snapshot.val();
            this.setState({estates})
        });
    }

    renderEstates = ()=>{
        let {estates, searchTerm} = this.state;
        if(estates.length === 0){
            return <h1>Loading ...</h1>
        } else {
            const items = Object.entries(estates).map((entry)=>{
                let key = entry[0];
                let item = entry[1];
                if(!item.city?.includes(searchTerm)
                    && !item.description?.includes(searchTerm)
                    && !item.address?.includes(searchTerm)
                    || item.approved === false){
                    return;
                }

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
                                <button onClick={()=>this.props.history.push(`/estateDetails/${key}`)}>View details</button>
                            </div>
                        </div>
                    </div>
                )
            });
            return <div>{items}</div>
        }
    };

    render() {
        return (
            <div className={"MainContainer Search"}>
                <div className={"searchFilters"}>
                    <input onChange={(e)=>this.setState({searchTerm: e.target.value})} placeholder={"Write your search term"}/>
                </div>
                <div className={"searchResults"}>
                    {this.renderEstates()}
                </div>
            </div>
        );
    }
}
