const express = require("express");
const bodyParse = require("body-parser");
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParse.json());
app.use(bodyParse.urlencoded({extended : true}));

app.get('/api/customers', (req, res) => {
    res.send([
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
        }]
    );
});

app.listen(port, () => console.log(`Listening on port ${port}`));
