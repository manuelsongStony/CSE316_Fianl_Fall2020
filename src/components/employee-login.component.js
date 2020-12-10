import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from "react-router-dom";


export default class LabTechLogin extends Component {
  constructor(props) {
    super(props);

    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      email: '',
      password: '',
      employeeArray: [],
      employeeElement: ''
    }
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    })
  }
  onChangePassword(e) {
    this.setState({
      password: e.target.value
    })
  }


  componentDidMount() {
    axios.get('http://localhost:5000/employees/')
        .then(response => {
            this.setState({ employeeArray: response.data })
        })
        .catch((error) => {
            console.log(error);
        })
  }

  handleClick() {


    for (var i = 0; i < this.state.employeeArray.length; i++) {
     

          if(this.state.employeeArray[i].email===this.state.email){
            if(this.state.employeeArray[i].passcode===this.state.password){
          this.setState({
            employeeElement: this.state.employeeArray[i]
          })
          this.setState({ redirect: "/employeeHome" });
         
        }
      }
    }
      
    
    this.setState({
      email: '',
      password: '',
      
    })
    
   
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={{pathname:this.state.redirect,
        state: { employeeElement: this.state.employeeElement }
      }} />
     
    }

    return (
        <div>
            <h2>Employee Login page for Results</h2>
            <p>
                Email:
                <input
                    required
                    type="text"
                    name="name"
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                />
                <br />
                Password:
                <input
                    required
                    type="text"
                    name="phone"
                    value={this.state.password}
                    onChange={this.onChangePassword}

                />
            </p>
            <button onClick={this.handleClick}>Login</button>

        </div>

    )
}

}