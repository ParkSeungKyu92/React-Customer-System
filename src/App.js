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

//css 꾸미기
const styles = theme => ({
  root : {
    width : '100%',
    marginTop : theme.spacing.uint * 3, //위쪽 여백 3의 가중치만큼
    overflowX: "auto"
  },
  table: {
    minWidth : 1080
  }
});

const customer = [
{
  id    : 1,
  image : "https://placeimg.com/64/64/1",
  name  : "박승규",
  birth : "920717",
  gender: "남자",
  job   : "백수" 
},
{
  id    : 2,
  image : "https://placeimg.com/64/64/2",
  name  : "김밥천국",
  birth : "123456",
  gender: "남자",
  job   : "요리사" 
},
{
  id    : 3,
  image : "https://placeimg.com/64/64/3",
  name  : "짜파게티",
  birth : "456789",
  gender: "남자",
  job   : "라면" 
},
];

class App extends Component{
  render(){
    const classes = this.props;
    return (
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
              </TableRow>
            </TableHead>
            <TableBody>
              {customer.map(c => { return (<Customer key={c.id} id={c.id} image={c.image} name={c.name} birth={c.birth} gender={c.gender} job={c.job}></Customer>); })}
            </TableBody>
          </Table>
      </Paper>
    );
  }
}

export default withStyles(styles)(App); //App에 props로 전달

//map사용시 key 설정해줘야한다!
