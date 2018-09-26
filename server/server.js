var express = require('express');
var bodyParser = require('body-parser');
var {ObjectId} = require('mongodb')

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

app.use(bodyParser.json());

//POST REST API
app.post('/todos',(req,res) =>{
  var todo = new Todo({
    text : req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  },(e) => {
    res.status(400).send(e);
  });
});

//GET REST API
app.get('/todos',(req,res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  },(e) => {
    res.status(400).send(e);
  })
});

//GET BY ID REST API
app.get('/todos/:id',(req,res) => {
   let id=req.params.id ;

   if (!ObjectId.isValid(id)) {
     return res.status(404).send();
   }
   Todo.findById(id).then((todo) =>{
      if (!todo){
        return res.status(404).send;
      }
      res.send({todo});
   }).catch((e) => {
     res.status(400).send();
   });
})

app.listen(3000, () =>{
  console.log('Server is started on port 3000');
});