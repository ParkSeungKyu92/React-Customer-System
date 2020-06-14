import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import { Typography } from '@material-ui/core';

class CustomerDelete extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            open : false
        };
    }
    deleteCutomer(id) {
        debugger;

        const url = '/api/customer/' + id;
        fetch(url, {
            method : "DELETE"
        });
        this.props.updateCustomer();
    }

    handleDeleteClose() {
        this.setState({
            open : false
        });
    }
    handleDeleteOpen() {
        this.setState({
            open : true
        });
    }
    render() {

        return(
            <div>
            <Button variant="contained" color="secondary" onClick={this.handleDeleteOpen.bind(this)}>삭제</Button>
            <Dialog open={this.state.open} onClose={this.handleDeleteClose.bind(this)}>
                <DialogTitle>삭제</DialogTitle>
                <DialogContent>
                    <Typography gutterBottom>
                    정말 삭제하시겠습니까?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="primary" onClick={this.deleteCutomer.bind(this, this.props.id)}>
                            네
                    </Button>
                    <Button variant="outlined" color="primary" onClick={this.handleDeleteClose.bind(this)}>
                            아니오
                    </Button>
                </DialogActions>
            </Dialog>
            </div>
        )
    }
}

export default CustomerDelete;