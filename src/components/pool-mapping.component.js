
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

/*
const Poolmap = props => (
    <tr>
        <td>{props.pool.poolBarcode}</td>
        <td>{props.pool.testBarcode}</td>
        <td>
            <Link to={"/edit/" + props.pool._id}>edit</Link> | <a href="#" onClick={() => { props.deletePool(props.pool._id) }}>delete</a>
        </td>
    </tr>
)

const TestBarcodeInput = props => (


    <tr>
        <td>Test barcode:</td>
        <td>
            <input
                required
                type="text"
                name="Barcode"
                value={props.testBarcode}
                onChange={this.onChangetestBarcode}

            />
        </td>
        <td>
            <button onClick={this.handleDeleteRow}>delete</button>
        </td>
    </tr>
)

export default class poolMapping extends Component {
    constructor(props) {
        super(props);
        this.state = {
            testBarcode: '',
            poolBarcode: '',
            poolMapArray: [],
            testBarcodeInputArray: [],
        };

        this.handleClick = this.handleClick.bind(this);

        this.deletePool = this.deletePool.bind(this);
        this.onChangepoolBarcode = this.onChangepoolBarcode.bind(this);
        this.onChangetestBarcode = this.onChangetestBarcode.bind(this);


        this.handleAddRow = this.handleAddRow.bind(this);
        this.handleDeleteRow = this.handleDeleteRow.bind(this);
    }







    componentDidMount() {
        axios.get('http://localhost:5000/poolMaps/')
            .then(response => {
                this.setState({ poolMapArray: response.data })
            })
            .catch((error) => {
                console.log(error);
            })

        this.setState({ labEmployeeElement: this.props.location.state.labEmployeeElement })
        //console.log("labEmployeeElement",this.props.location.state.labEmployeeElement);
    }

    deletePool(id) {
        axios.delete('http://localhost:5000/poolMaps/' + id)
            .then(response => { console.log(response.data) });

        this.setState({
            poolMapArray: this.state.poolMapArray.filter(el => el._id !== id)
        })
    }

    poolMapList() {
        return this.state.poolMapArray.map(currentPool => {
            return <Poolmap pool={currentPool} deletePool={this.deletePool} key={currentPool._id} />;
        })
    }

    testBarcodeInputList() {
        return this.state.testBarcodeInputArray.map(currentInput => {
            return <TestBarcodeInput testBarcode={currentInput} handleDeleteRow={this.handleDeleteRow}
                poolBarcode={this.state.poolBarcode} />;
        })
    }



    onChangepoolBarcode(e) {
        this.setState({
            poolBarcode: e.target.value
        })
    }

    onChangetestBarcode(e) {
        this.setState({
            testBarcode: e.target.value
        })
    }

    handleClick() {
        //e.preventDefault();

        const employeePool = {
            testBarcode: this.state.testBarcode,
            poolBarcode: this.state.poolBarcode

        }

        console.log(employeePool);

        axios.post('http://localhost:5000/poolMaps/add', employeePool)
            .then(res => console.log(res.data));

        this.setState({
            testBarcode: '',
            poolBarcode: ''

        })


        axios.get('http://localhost:5000/poolMaps/')
            .then(response => {
                this.setState({ poolMapArray: response.data })
            })
            .catch((error) => {
                console.log(error);
            })


    }



    handleAddRow() {
        this.setState({ testBarcodeInputArray: this.state.testBarcodeInputArray.push("111") })
     
    }
    handleDeleteRow() {

    }



    render() {
        return (
            <div>
                <h2>Pool Mapping</h2>
                <p>
                    Pool barcode:
                      <input
                        required
                        type="text"
                        name="poolBarcode"
                        value={this.state.poolBarcode}
                        onChange={this.onChangepoolBarcode}
                    />
                    <br />
                    </p>
                    <table className="table">
                        <tbody>
                            {this.testBarcodeInputList()}
                        </tbody>
                    </table>

                    <button onClick={this.handleAddRow}>Add more rows</button>
                
                <button onClick={this.handleClick}>Submit pool</button>

                <br />
                <br />
                <br />

                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Pool Barcodes</th>
                            <th>Test Barcodes</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.poolMapList()}
                    </tbody>
                </table>

            </div>

        )
    }
}
*/
export default class poolMapping extends Component {

    constructor(props) {
        super(props);
        this.state = {
            countries:[]
        };

        this.addCountry = this.addCountry.bind(this);

      
    }
    

    addCountry(){
        this.setState({countries: [...this.state.countries,""]})
    }

    handleChange(e,index){
        this.state.countries[index]=e.target.value
        this.setState({countries: this.state.countries})
    }

    handleRemove(index){
        this.state.countries.splice(index,1)

        console.log(this.state.countries, "$$$$");

        this.setState({countries: this.state.countries})
    }
    handleSubmit(e){
        

        console.log(this.state, "$$$$");

      
    }

    render(){
        return(
            <div className="App">
                <h1>The FORM</h1>
                <label>Address</label>
                {
                    this.state.countries.map((country,index)=>{
                        return(
                            <div key={index}>
                                <input onChange={(e)=>this.handleChange(e,index)} value={country}/>
                            
                                <button onClick={()=>this.handleRemove(index)}>Remove</button>
                            </div>
                        )
                    })
                }

                <hr />

                <button onClick={(e)=>this.addCountry(e)}>Add Country</button>

                <hr />

                <button onClick={(e)=>this.handleSubmit(e)}>Submit</button>

            </div>
        );

    }


}
