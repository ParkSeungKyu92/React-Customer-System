import React from 'react';


class CustomerDelete extends React.Component{

    deleteCutomer(id) {
        const url = '/api/customer/' + id;
        fetch(url, {
            method : "DELETE"
        });
        this.props.updateCustomer();
    }

    render() {

        return(
            <button onClick={function(e) {
                this.deleteCutomer(this.props.id);
            }.bind(this)}> 삭제 </button>
        )
    }
}

export default CustomerDelete;