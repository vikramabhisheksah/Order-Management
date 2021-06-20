import React, { Component } from "react";
import { BrowserRouter as Router, Route  } from "react-router-dom";
import "./App.css";
import RequestForm from "./Components/reqForm2";
import Dashbord from "./Components/dashbord";
import Navbar from "./Components/navbar";
import Uploader from "./Components/fileUpload";
import Admin from "./Components/createAdmin";
import Footer from "./Components/footer";
import configData from "./Components/config.json";
import axios from "axios";


class App extends Component {
constructor(props){
  super(props);
    this.state = {
      userRole:1,
      email:this.props.email,
      username:this.props.username,
      isReady:false,
    };
}

pullUserRole(){
  axios
    .post(configData.SERVER_URL +"/api/getUserRole", {email:this.state.email})
    .then((res) => {
        console.log(res);
        this.setState({
            userRole:res.data[0].user_role
        });
        //this.props.setRole(res.data[0].user_role);
    })
    .catch((err) => {
    console.log("User doesnot exist in the Role table. User role : Requestor");
  }); 
}

componentDidMount() {
    //this.pullUserRole();
    if (this.state.email) {
      axios.defaults.headers.common['User'] = this.state.email;
  } else {
      axios.defaults.headers.common['User'] = null;
      /*if setting null does not remove `Authorization` header then try     
        delete axios.defaults.headers.common['Authorization'];
      */
  }
    axios
    .post(configData.SERVER_URL +"/api/getUserRole", {email:this.state.email})
    .then((res) => {
        console.log(res);
        this.setState({
            userRole:res.data[0].user_role
        });
        this.setState({isReady: true});
    })
    .catch((err) => {
    console.log("User doesnot exist in the Role table. User role : Requestor");
    this.setState({isReady: true})
    });
}


  render() {
    
    if (this.state.isReady){
      return (
              <div className="App">

                <div id="page-wrap">
                  <Router>
                    <Navbar name= {this.state.username} userRole={this.state.userRole} email={this.state.email}/>
                    
                    <Route exact path="/" render={(props) => (<RequestForm {...props} email={this.state.email} />)}/>
                    <Route exact path="/dashboard" render={
                      (props) => (<Dashbord {...props} email={this.state.email} userRole={this.state.userRole}/>)}/>
                    <Route exact path="/upload" render={(props) => (<Uploader {...props} email={this.state.email} />)}/>
                    <Route exact path="/userMgmt" render={(props) => 
                      (this.state.userRole===1 || this.state.userRole===3) ? (<Admin {...props} />):(<RequestForm {...props} email={this.state.email} />)}/>
                    
                  </Router>
                </div>
                <Footer/>
              </div>
            );
      }else{
        return (<p>Loading...</p>);
      }
  }
}

export default App;
