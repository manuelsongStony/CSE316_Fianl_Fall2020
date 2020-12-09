import React, { Component } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";

export default class labHome extends Component {
    constructor(props) {
        super(props);

        this.handleTestCollectionButton = this.handleTestCollectionButton.bind(this);
        this.handlePoolMappingButton = this.handlePoolMappingButton.bind(this);
        this.handleWellTestingButton = this.handleWellTestingButton.bind(this);
    }

    handleTestCollectionButton = () => {
        window.location = '/testCollection';
    }
    handlePoolMappingButton = () => {
        window.location = '/poolMapping';
    }
    handleWellTestingButton = () => {
        window.location = '/wellTesting';
    }
    render() {
        return (
            <div>
                This is lab home page
                <br/>
                <button onClick={this.handleTestCollectionButton}>
                    Test Collection
                </button>
                <br/>
                <br/>
                <button onClick={this.handleTestCollectionButton}>
                    Pool Mapping
                </button>
                <br/>
                <br/>
                <button onClick={this.handleTestCollectionButton}>
                    Well Testing
                </button>
            </div>

        )
    }
}