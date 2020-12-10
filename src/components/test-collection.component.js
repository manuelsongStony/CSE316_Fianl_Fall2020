import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


const Test = props => (
    <tr>
        <td>{props.test.employeeID}</td>
        <td>{props.test.testBarcode}</td>
        <td>
            <Link to={"/edit/" + props.test._id}>edit</Link> | <a href="#" onClick={() => { props.deleteTest(props.test._id) }}>delete</a>
        </td>
    </tr>
)

export default class testCollection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employeeID: '',
            testBarcode: '',
            testArray: []
        };

        this.handleClick = this.handleClick.bind(this);

        this.deleteTest = this.deleteTest.bind(this);
        this.onChangeemployeeID = this.onChangeemployeeID.bind(this);
        this.onChangetestBarcode = this.onChangetestBarcode.bind(this);
    }







    componentDidMount() {
        axios.get('http://localhost:5000/employeeTests/')
            .then(response => {
                this.setState({ testArray: response.data })
            })
            .catch((error) => {
                console.log(error);
            })
            
            this.setState({ labEmployeeElement: this.props.location.state.labEmployeeElement})
                //console.log("labEmployeeElement",this.props.location.state.labEmployeeElement);
    }

    deleteTest(id) {
        axios.delete('http://localhost:5000/employeeTests/' + id)
            .then(response => { console.log(response.data) });

        this.setState({
            testArray: this.state.testArray.filter(el => el._id !== id)
        })
    }

    testList() {
        return this.state.testArray.map(currentTest => {
            return <Test test={currentTest} deleteTest={this.deleteTest} key={currentTest._id} />;
        })
    }


    onChangeemployeeID(e) {
        this.setState({
            employeeID: e.target.value
        })
      }
    
      onChangetestBarcode(e) {
        this.setState({
            testBarcode: e.target.value
        })
      }
    
       handleClick() {
        //e.preventDefault();
    
        const employeeTest = {
            testBarcode: this.state.testBarcode,
            employeeID: this.state.employeeID,
            collectionTime: new Date(),
            collectedBy: this.state.labEmployeeElement.labID
        }
    
        console.log(employeeTest);
    
        axios.post('http://localhost:5000/employeeTests/add', employeeTest)
          .then(res => console.log(res.data));
    
        this.setState({
            employeeID: '',
            testBarcode: ''

        })


         axios.get('http://localhost:5000/employeeTests/')
            .then(response => {
                this.setState({ testArray: response.data })
            })
            .catch((error) => {
                console.log(error);
            })
        
            /*
        this.setState({
            testArray: this.state.testArray.push(employeeTest)
        })
        */
      }

    render() {
        return (
            <div>
                <h2>Test Collection</h2>
                <p>
                    Employee ID:
                    <input
                        required
                        type="text"
                        name="employeeID"
                        value={this.state.employeeID}
                        onChange={this.onChangeemployeeID}
                    />
                    <br />
                    Test barcode:
                    <input
                        required
                        type="text"
                        name="Barcode"
                        value={this.state.testBarcode}
                        onChange={this.onChangetestBarcode}

                    />
                </p>
                <button onClick={this.handleClick}>Add</button>

                <br />
                <br />
                <br />

                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Employee ID</th>
                            <th>Test Barcode</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.testList()}
                    </tbody>
                </table>

            </div>

        )
    }
}

