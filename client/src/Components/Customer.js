import React, { Component } from 'react';
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import CustomerDelete from './CustomerDelete';

class Customer extends Component{
    render() {
        const imageMin = {
            width : '64px',
            height : '64px'
        };
        return(
            <TableRow>
                <TableCell>{this.props.id}</TableCell>
                <TableCell><img className={imageMin} src={this.props.image} alt="profile"></img></TableCell>
                <TableCell>{this.props.name}</TableCell>
                <TableCell>{this.props.birth}</TableCell>
                <TableCell>{this.props.gender}</TableCell>
                <TableCell>{this.props.job}</TableCell>
                <TableCell><CustomerDelete updateCustomer={this.props.updateCustomer} id={this.props.id}/></TableCell>
            </TableRow>
        );
    }
}
export default Customer;