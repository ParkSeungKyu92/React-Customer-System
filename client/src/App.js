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
import AppBarHeader from './Components/AppBarHeader.js';


//css 꾸미기
const styles = theme => ({
  root : {
    width : '100%',
    minWidth : 1080,
  },
  progress : {
    margin : theme.spacing.uint * 2
  },
  tableHead : {
    fontSize: '1.5rem'
  },
  paper: {
    marginLeft : 18,
    marginRight: 18
  },
  menu : {
    marginTop : 15,
    marginBottom : 15,
    display : 'flex',
    justifyContent : 'center'
  }
});


//
class App extends Component{

  constructor(props) {
    super(props);
    this.state = {
      customer : "",
      completed : 0,
      searchKeyword : ""
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
      completed : 0,
      searchKeyword : ""
    });
    this.callApi()
      .then(res => this.setState({customer : res}))
      .catch(err => console.log(err));
  }

  handleSearchKeyword(value) {
    this.setState({
      searchKeyword : value
    });
  }

  render(){
    const filteredComponents = (data) => {
      data = data.filter((c) => {
        return c.name.indexOf(this.state.searchKeyword) > - 1;
      });
      return data.map((c) => {
        return (<Customer key={c.id} id={c.id} image={c.image} name={c.name} birth={c.birth} gender={c.gender} job={c.job} updateCustomer={this.updateCustomer.bind(this)}></Customer>); 
      });
    }
    const {classes} = this.props;
    const cellList = ["번호", "프로필 이미지", "이름", "생년월일", "성별", "직업", "삭제"];
    var keyValue = 0;
    return (
      <div className={classes.root}>
      <AppBarHeader searchKeyword={this.state.searchKeyword} handleSearchKeyword={this.handleSearchKeyword.bind(this)}/>
      <div className={classes.menu}>
        <CustomerAdd updateCustomer={this.updateCustomer.bind(this)}/>
      </div>
      <Paper className={classes.paper}>
          <Table>
            <TableHead>
              <TableRow>
                {cellList.map(c => {return (<TableCell key={keyValue++} className={classes.tableHead}>{c}</TableCell>)})}
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.customer ? filteredComponents(this.state.customer) :
               <TableRow>
                  <TableCell align="center" colSpan="6">
                    <CircularProgress className={classes.progress} variant="determinate" value={this.state.completed}></CircularProgress>
                  </TableCell>
                 </TableRow>}
            </TableBody>
          </Table>
      </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(App); //App에 props로 전달

//map사용시 key 설정해줘야한다!
