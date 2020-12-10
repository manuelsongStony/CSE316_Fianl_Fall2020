import React, { Component } from 'react';

import "bootstrap/dist/css/bootstrap.min.css";
import { Redirect } from "react-router-dom";

export default class labHome extends Component {
    constructor(props) {
        super(props);

        this.handleTestCollectionButton = this.handleTestCollectionButton.bind(this);
        this.handlePoolMappingButton = this.handlePoolMappingButton.bind(this);
        this.handleWellTestingButton = this.handleWellTestingButton.bind(this);
        this.state = {
             redirect: null 
          }
    }
    componentDidMount(){
       
        console.log("labEmployeeElement",this.props.location.state.labEmployeeElement);
    }

    handleTestCollectionButton = () => {
        //window.location = '/testCollection';
        this.setState({ redirect: "/testCollection" });
    }
    handlePoolMappingButton = () => {
        //window.location = '/poolMapping';
        this.setState({ redirect: "/poolMapping" });
    }
    handleWellTestingButton = () => {
        //window.location = '/wellTesting';
        this.setState({ redirect: "/wellTesting" });
    }
    render() {
        if (this.state.redirect) {
            return <Redirect to={{pathname:this.state.redirect,
              state: { labEmployeeElement: this.props.location.state.labEmployeeElement }
            }} />
          }

        return (
            <div>
                This is lab home page
                <br/>
                <button onClick={this.handleTestCollectionButton}>
                    Test Collection
                </button>
                <br/>
                <br/>
                <button onClick={this.handlePoolMappingButton}>
                    Pool Mapping
                </button>
                <br/>
                <br/>
                <button onClick={this.handleWellTestingButton}>
                    Well Testing
                </button>
            </div>

        )
    }


    
}