
import React, { Component } from 'react';

import axios from 'axios';


const Poolmap = props => (
    <tr>
        <td>{props.pool.poolBarcode}</td>
        <td>
        {props.pool.testBarcodes.map((item,index) => {
            if(index===props.pool.testBarcodes.length-1){
                return item;
            }else{
          return item+", ";}
        })}
          
        
        </td>
        <td>
        <button onClick={() => { props.editPool(props.pool._id) }}>Edit</button> | <button onClick={() => { props.deletePool(props.pool._id) }}>Delete</button>
        </td>
    </tr>
)
//{props.pool.testBarcodes[0]}


export default class poolMapping extends Component {
    constructor(props) {
        super(props);
        this.state = {
            testBarcode: '',
            poolBarcode: '',
            poolMapArray: [],
            testBarcodeInputArray: [],
        };

        

        this.deletePool = this.deletePool.bind(this);
        this.editPool = this.editPool.bind(this);
        
        this.onChangepoolBarcode = this.onChangepoolBarcode.bind(this);
        this.onChangetestBarcode = this.onChangetestBarcode.bind(this);


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
        
    }

    deletePool(id) {
        axios.delete('http://localhost:5000/poolMaps/' + id)
            .then(response => { console.log(response.data) });

        this.setState({
            poolMapArray: this.state.poolMapArray.filter(el => el._id !== id)
        })
    }

    editPool(id) {
        
        
        this.setState({
           
            poolBarcode:this.state.poolMapArray.filter(el => el._id === id)[0].poolBarcode,
            testBarcodeInputArray:this.state.poolMapArray.filter(el => el._id === id)[0].testBarcodes
        })
        axios.delete('http://localhost:5000/poolMaps/' + id)
            .then(response => { console.log(response.data) });

        this.setState({
            poolMapArray: this.state.poolMapArray.filter(el => el._id !== id)
        })
        }


    poolMapList() {
        return this.state.poolMapArray.map(currentPool => {
            return <Poolmap pool={currentPool} deletePool={this.deletePool} editPool ={this.editPool}
            key={currentPool._id} />;
        })
    }

   



    onChangepoolBarcode(e) {
        this.setState({
            poolBarcode: e.target.value
        })
    }

    



    addTestBarcodeInput(){
        this.setState({testBarcodeInputArray: [...this.state.testBarcodeInputArray,""]})
    }

    onChangetestBarcode(e,index){
        this.state.testBarcodeInputArray[index]=e.target.value
        this.setState({testBarcodeInputArray: this.state.testBarcodeInputArray})
    }

    handleRemove(index){
        this.state.testBarcodeInputArray.splice(index,1)

        console.log(this.state.testBarcodeInputArray, "$$$$");

        this.setState({testBarcodeInputArray: this.state.testBarcodeInputArray})
    }
    handleSubmit(e){
        

        
            
            
            const poolMap = {
                poolBarcode: this.state.poolBarcode,
                testBarcodes: this.state.testBarcodeInputArray
    
            }
    
    
            axios.post('http://localhost:5000/poolMaps/add', poolMap)
                .then(res => console.log(res.data))
            
           


        

        


        axios.get('http://localhost:5000/poolMaps/')
            .then(response => {
                this.setState({ poolMapArray: response.data })
            })
            .catch((error) => {
                console.log(error);
            })


            this.setState({
                
                poolBarcode: '',
                testBarcodeInputArray: []
    
            })
      
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
                    <label>Test barcodes:</label>
                {
                    this.state.testBarcodeInputArray.map((input,index)=>{
                        return(
                            <div key={index}>
                                <input onChange={(e)=>this.onChangetestBarcode(e,index)} value={input}/>
                            
                                <button onClick={()=>this.handleRemove(index)}>delete</button>
                            </div>
                        )
                    })
                }

                <hr />

                <button onClick={(e)=>this.addTestBarcodeInput(e)}>Add more rows</button>

                <hr />

                <button onClick={(e)=>this.handleSubmit(e)}>Submit pool</button>
                
              

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

