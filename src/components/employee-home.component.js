import React, { Component } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import { Redirect } from "react-router-dom";




const TestResult = props => (
    <tr>
        <td>{props.testResult.collectionTime}</td>
        <td>{props.testResult.collectedBy}</td>
        
    </tr>
)

export default class employeeHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employeeElement:'',
            filteredTestArray: [],
            poolMapArray: [],
            wellTestArray: [],
            testResultArray: []
           
        };
        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentDidUpdate = this.componentDidUpdate.bind(this);
    }


    componentDidMount() {
        this.setState({ employeeElement: this.props.location.state.employeeElement})
        console.log("employeeElement",this.props.location.state.employeeElement);



        axios.all([
            axios.get('http://localhost:5000/employeeTests/'), 
            axios.get('http://localhost:5000/poolMaps/'),
            axios.get('http://localhost:5000/wellTestings/')
          ])
          .then(axios.spread((obj1, obj2, obj3) => {
    
            this.setState({ filteredTestArray: obj1.data.filter(
                el => el.employeeID === this.state.employeeElement.employeeID) ,
                poolMapArray: obj2.data,
                wellTestArray: obj3.data
                
            })

          }));




/*
        axios.get('http://localhost:5000/employeeTests/')
            .then(response => {
                this.setState({ filteredTestArray: response.data.filter(
                    el => el.employeeID === this.state.employeeElement.employeeID) })
            })
            .catch((error) => {
                console.log(error);
            })


        axios.get('http://localhost:5000/poolMaps/')
            .then(response => {
                this.setState({ poolMapArray: response.data })
            })
            .catch((error) => {
                console.log(error);
            })

        axios.get('http://localhost:5000/wellTestings/')
            .then(response => {
              this.setState({ wellTestArray: response.data })
            })
            .catch((error) => {
              console.log(error);
            })

            
            */
            


    }
    //componentWillUnmount
    componentDidUpdate(){
        
       
  


    }



    testList() {

         /*
        let filteredArray =this.state.filteredTestArray.filter(
            el => el.employeeID === this.state.employeeElement.employeeID)
        console.log(filteredArray)
           */
       // this.setState({ testResultArray: filteredArray })
       let tArray =this.state.filteredTestArray;
       let pArray =this.state.poolMapArray;
       let wArray =this.state.wellTestArray;

       /*
       pArray.filter(
        el => el.testBarcodes.includes(element.testBarcode))
        */
       console.log(wArray)
       console.log(pArray)
       
        if(pArray!==undefined){
            if(wArray!==undefined){
                if(tArray!==undefined){

                   
                    
                    tArray.forEach((element) => {
                        //element.collectedBy="sing"
                        /*
                        element.collectedBy=wArray.filter( //collectedBy=result
                            WAel => WAel.poolBarcode===pArray.filter(
                                PAel => PAel.testBarcodes.includes(element.testBarcode))[0].poolBarcode)[0].result
                          */ 
                         let pArray =this.state.poolMapArray;
                         let wArray =this.state.wellTestArray;

                         element.collectedBy="Not start yet"

                          if(pArray.filter(
                            PAel => PAel.testBarcodes.includes(element.testBarcode))[0]!==undefined){

                            element.collectedBy="team"

                            if(wArray.filter( //collectedBy=result
                                WAel => WAel.poolBarcode===pArray.filter(
                                    PAel => PAel.testBarcodes.includes(element.testBarcode))[0].poolBarcode)[0]!==undefined){

                                        element.collectedBy=wArray.filter( //collectedBy=result
                                            WAel => WAel.poolBarcode===pArray.filter(
                                                PAel => PAel.testBarcodes.includes(element.testBarcode))[0].poolBarcode)[0].result
                                    }

                          }


                    });
                    

                    
                }
            }
        }

        //this.setState({ testResultArray: tArray })
        
        
        return tArray.map(currentTestResult => {
            return <TestResult testResult={currentTestResult} key={currentTestResult._id} />;
        })
    }


    
     

    render() {
        return (
            <div>
                <h2>Employee home</h2>
             

                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Collection Date</th>
                            <th>Result</th>
                            
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

