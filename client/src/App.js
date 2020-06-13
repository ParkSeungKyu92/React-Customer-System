import React, { Component } from 'react';
import './App.css';
import Customer from './Components/Customer';
import Paper from '@material-ui/core/Paper'; 
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import {withStyles} from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import CustomerAdd from './Components/CustomerAdd';
//css 꾸미기
const styles = theme => ({
  root : {
    width : '100%',
    marginTop : theme.spacing.uint * 3, //위쪽 여백 3의 가중치만큼
    overflowX: "auto"
  },
  table: {
    minWidth : 1080
  },
  progress : {
    margin : theme.spacing.uint * 2
  }
});


//
class App extends Component{

  constructor(props) {
    super(props);
    this.state = {
      customer : "",
      completed : 0
    };
  }
  
  progress() {
    const completed = this.state.completed;
    this.setState({completed : completed >= 100 ? 0 : completed + 1});
  }

  componentDidMount() {//모든 component가 마운트가 되면 실행됨
    this.timer = setInterval(this.progress.bind(this), 20);
    this.callApi()
      .then(res => this.setState({customer : res}))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/customers');
    const body = await response.json();
    return body;
  }

  updateCustomer() {
    this.setState({
      customer : '',
      completed : 0
    });
    this.callApi()
      .then(res => this.setState({customer : res}))
      .catch(err => console.log(err));
  }

  render(){
    const classes = this.props;
    return (
      <div>
      <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>번호</TableCell>
                <TableCell>이미지</TableCell>
                <TableCell>이름</TableCell>
                <TableCell>생일</TableCell>
                <TableCell>성별</TableCell>
                <TableCell>직업</TableCell>
                <TableCell>삭제</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.customer ? this.state.customer.map(c => { return (<Customer key={c.id} id={c.id} image={c.image} name={c.name} birth={c.birth} gender={c.gender} job={c.job} updateCustomer={this.updateCustomer.bind(this)}></Customer>); })
               : <TableRow>
                  <TableCell align="center" colSpan="6">
                    <CircularProgress className={classes.progress} variant="determinate" value={this.state.completed}></CircularProgress>
                  </TableCell>
                 </TableRow>}
            </TableBody>
          </Table>
      </Paper>
      <CustomerAdd updateCustomer={this.updateCustomer.bind(this)}/>
      </div>
    );
  }
}

export default withStyles(styles)(App); //App에 props로 전달

//map사용시 key 설정해줘야한다!
