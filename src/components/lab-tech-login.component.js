import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from "react-router-dom";


export default class EmployeeLogin extends Component {
  constructor(props) {
    super(props);

    this.onChangelabID = this.onChangelabID.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      labID: '',
      password: '',
      labEmployeeArray: [],
      labEmployeeElement: ''
    }
  }

  onChangelabID(e) {
    this.setState({
      labID: e.target.value
    })
  }
  onChangePassword(e) {
    this.setState({
      password: e.target.value
    })
  }


  componentDidMount() {
    axios.get('http://localhost:5000/labEmployees/')
        .then(response => {
            this.setState({ labEmployeeArray: response.data })
        })
        .catch((error) => {
            console.log(error);
        })
  }

  handleClick() {


    for (var i = 0; i < this.state.labEmployeeArray.length; i++) {
     
      //if(this.state.labEmployeeArray[i].labID.localeCompare(this.state.labID)){
       // if(this.state.labEmployeeArray[i].password.localeCompare(this.state.password)){

          if(this.state.labEmployeeArray[i].labID===this.state.labID){
            if(this.state.labEmployeeArray[i].password===this.state.password){
          this.setState({
            labEmployeeElement: this.state.labEmployeeArray[i]
          })
          this.setState({ redirect: "/labHome" });
          //window.location = '/labHome';
        }
      }
    }
      
    
    this.setState({
      labID: '',
      password: '',
      
    })
    
   
  }
  /*
  render() {
    return (
      <div>
        <h3>Employee Login page for Results</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Lab ID: </label>
            <input type="text"
              required
              className="form-control"
              value={this.state.labID}
              onChange={this.onChangelabID}
            />
          </div>
          <div className="form-group">
            <label>Password: </label>
            <input type="text"
              required
              className="form-control"
              value={this.state.password}
              onChange={this.onChangePassword}
            />
          </div>
          <div className="form-group">
            <input type="submit" value="Lab Login" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
  */
  render() {
    if (this.state.redirect) {
      return <Redirect to={{pathname:this.state.redirect,
        state: { labEmployeeElement: this.state.labEmployeeElement }
      }} />
     // <Link to={"/labHome/"+this.state.labEmployeeElement._id}/>
    }

    return (
        <div>
            <h2>Employee Login page for Results</h2>
            <p>
                Lab ID:
                <input
                    required
                    type="text"
                    name="name"
                    value={this.state.labID}
                    onChange={this.onChangelabID}
                />
                <br />
                Test barcode:
                <input
                    required
                    type="text"
                    name="phone"
                    value={this.state.password}
                    onChange={this.onChangePassword}

                />
            </p>
            <button onClick={this.handleClick}>Lab Login</button>

        </div>

    )
}

}