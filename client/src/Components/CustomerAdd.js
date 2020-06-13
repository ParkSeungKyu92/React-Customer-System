import React from 'react';
import { post } from 'axios';

class CustomerAdd extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            file : null,
            userName : '',
            birth : '',
            gender : '',
            job : '',
            fileName  : ''
        };
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.addCustomer = this.addCustomer.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);
    }

    handleFormSubmit(e) {
        e.preventDefault();
        this.addCustomer()
            .then(function(response) {
                console.log(response.data);
                this.props.updateCustomer();
            }.bind(this));
            
        this.setState({
            file : null,
            userName : '',
            birth : '',
            gender : '',
            job : '',
            fileName  : ''
        });
        //window.location.reload();
    }

    addCustomer(e) {
        const url = '/api/customers';
        const formData = new FormData();
        formData.append('image', this.state.file);
        formData.append('fileName', this.state.fileName);
        formData.append('userName', this.state.userName);
        formData.append('birth', this.state.birth);
        formData.append('gender', this.state.gender);
        formData.append('job', this.state.job);
        //전송할 데이터에 파일이 있을경우
        const config = {
            headers : {
                'context-type' : 'multipart/form-data'
            }
        }
        return post(url, formData, config);
    }

    handleFileChange(e) {
        e.preventDefault();
        this.setState({
            file : e.target.files[0],
            fileName : e.target.value
        });
    }

    handleValueChange(e){
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    render() {
        return(
            <form onSubmit={this.handleFormSubmit}>
                <h1>고객 추가</h1><br/>
                프로필 이미지 : <input type='file' name='file' file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange}></input><br/>
                이름 : <input type='text' name='userName' value={this.state.userName} onChange={this.handleValueChange}></input><br/>
                생년월일 : <input type='text' name='birth' value={this.state.birth} onChange={this.handleValueChange}></input><br/>
                성별 : <input type='text' name='gender' value={this.state.gender} onChange={this.handleValueChange}></input><br/>
                직업 : <input type='text' name='job' value={this.state.job} onChange={this.handleValueChange}></input><br/>
                <button type='submit'>추가하기</button><br/>
            </form>
        )
    }
}

export default CustomerAdd;