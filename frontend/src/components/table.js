import React, { Component } from 'react';
import ReactTable from "react-table";
import 'react-table/react-table.css'
//import { Button} from "react-bootstrap";

class Table extends Component {
  constructor(props){
    super(props);
  }
  
  render() {
    
    const users=this.props.users;
    console.log(users)
    let tempArr = [];
    Object.keys(users).forEach( (element) => {
        tempArr.push(users[element]);
    });
    
    let json = JSON.stringify( tempArr);
    console.log('Data',json);
      const columns = [{
        Header: 'User Name',
        accessor: 'username' // String-based value accessors!
      }, {
        Header: 'Email',
        accessor: 'email',
        
      },
      {
        Header: '',
        Cell: row => (
          <div>
            <button onClick={() => this.props.handleDelete(row.original)}>Delete</button>
          </div>
        )
      }
      ]
      
    return (
      <div className="Table">
       <ReactTable
       columns={columns}
       data={JSON.parse(json)}
       defaultPageSize={5}
       >
       </ReactTable>
      </div>
    );
  }
}
export default Table;
