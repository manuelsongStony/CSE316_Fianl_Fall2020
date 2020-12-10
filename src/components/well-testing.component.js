import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


const WellTest = props => (
  <tr>
    <td>{props.wellTest.wellBarcode}</td>
    <td>{props.wellTest.poolBarcode}</td>
    <td>{props.wellTest.result}</td>
    <td>
    <a href="#" onClick={() => { props.editTest(props.wellTest._id) }}>Edit</a> |
            <a href="#" onClick={() => { props.deleteTest(props.wellTest._id) }}>Delete</a>
    </td>
  </tr>
)

export default class wellTesting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wellBarcode: '',
      poolBarcode: '',
      result: 'in progress',
      wellTestArray: []
    };

    this.handleClick = this.handleClick.bind(this);

    this.deleteTest = this.deleteTest.bind(this);
    this.editTest = this.editTest.bind(this);
    this.onChangeWellBarcode = this.onChangeWellBarcode.bind(this);
    this.onChangePoolBarcode = this.onChangePoolBarcode.bind(this);
    this.onChangeResult = this.onChangeResult.bind(this);

  }







  componentDidMount() {
    axios.get('http://localhost:5000/wellTestings/')
      .then(response => {
        this.setState({ wellTestArray: response.data })
      })
      .catch((error) => {
        console.log(error);
      })

    this.setState({ labEmployeeElement: this.props.location.state.labEmployeeElement })
    //console.log("labEmployeeElement",this.props.location.state.labEmployeeElement);
  }

  deleteTest(id) {
    axios.delete('http://localhost:5000/wellTestings/' + id)
      .then(response => { console.log(response.data) });

    this.setState({
      wellTestArray: this.state.wellTestArray.filter(el => el._id !== id)
    })
  }

  editTest(id) {
        
        
    this.setState({
       
      wellBarcode:this.state.wellTestArray.filter(el => el._id == id)[0].wellBarcode,
      poolBarcode:this.state.wellTestArray.filter(el => el._id == id)[0].poolBarcode,
      result:this.state.wellTestArray.filter(el => el._id == id)[0].result
    })
    axios.delete('http://localhost:5000/wellTestings/' + id)
        .then(response => { console.log(response.data) });

    this.setState({
      wellTestArray: this.state.wellTestArray.filter(el => el._id !== id)
    })
    }

  wellTestList() {
    return this.state.wellTestArray.map(currentWellTest => {
      return <WellTest wellTest={currentWellTest} deleteTest={this.deleteTest} editTest ={this.editTest}
        key={currentWellTest._id} />;
    })
  }


  onChangeWellBarcode(e) {
    this.setState({
      wellBarcode: e.target.value
    })
  }

  onChangePoolBarcode(e) {
    this.setState({
      poolBarcode: e.target.value
    })
  }
  onChangeResult(e) {
    this.setState({
      result: e.target.value
    })
  }

  handleClick() {
    //e.preventDefault();

    const wellTest = {
      wellBarcode: this.state.wellBarcode,
      poolBarcode: this.state.poolBarcode,
      testingStartTime: new Date(),
      testingEndTime: new Date(),
      result: this.state.result,
    }

    console.log(wellTest);

    axios.post('http://localhost:5000/wellTestings/add', wellTest)
      .then(res => console.log(res.data));

    this.setState({
      wellBarcode: '',
      poolBarcode: '',
      result: 'in progress'
    })


    axios.get('http://localhost:5000/wellTestings/')
      .then(response => {
        this.setState({ wellTestArray: response.data })
      })
      .catch((error) => {
        console.log(error);
      })


  }

  render() {
    return (
      <div>
        <h2>Well testing</h2>
        <p>
          well barcode:
                    <input
            required
            type="text"
            name="wellBarcode"
            value={this.state.wellBarcode}
            onChange={this.onChangeWellBarcode}
          />
          <br />
                    Poll barcode:
                    <input
            required
            type="text"
            name="poolBarcode"
            value={this.state.poolBarcode}
            onChange={this.onChangePoolBarcode}

          />
          <br />
                    Result:
            <select 
            required
            className="form-control"
            value={this.state.result}
            onChange={this.onChangeResult}>
            <option value="in progress">in progress</option>
            <option value="negative">negative</option>
            <option value="postive">postive</option>
          </select>
        </p>
        <button onClick={this.handleClick}>Add</button>

        <br />
        <br />
        <br />

        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Well Barcode</th>
              <th>Pool Barcode</th>
              <th>Result</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.wellTestList()}
          </tbody>
        </table>

      </div>

    )
  }
}

