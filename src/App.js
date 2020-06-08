import React, { Component } from 'react';
import './App.css';
import Customer from './Components/Customer'

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
  name  : "박정은",
  birth : "960917",
  gender: "여자",
  job   : "개발자" 
},
{
  id    : 3,
  image : "https://placeimg.com/64/64/3",
  name  : "박세진",
  birth : "950228",
  gender: "여자",
  job   : "IDC" 
},
];

class App extends Component{
  render(){
    return (
      <div>
        {
          //map사용시 key 설정해줘야한다!
          customer.map(c => {
            return (<Customer
              key={c.id}
              id={c.id}
              image={c.image}
              name={c.name}
              birth={c.birth}
              gender={c.gender}
              job={c.job}>
            </Customer>);
          })
        }
      </div>
    );
  }
}

export default App;
