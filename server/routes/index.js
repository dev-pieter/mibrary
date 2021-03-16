var express = require('express');
var router = express.Router();
const {google} = require('googleapis');
const MongoClient = require('mongodb').MongoClient;
const { ObjectId } = require('mongodb');

//MongoDB connection
const uri = "mongodb+srv://admin:12345@mibrarydata.v8ge1.mongodb.net/mibraryData?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  if(err){
    console.log(err);
    client.close();
  }else{
    console.log("connected to db");
  }
});

/* GET home page. */
router.get('/:id/books', async (req, res) => {
  var { id } = req.params

  const db = await client.db("mibraryData").collection("users");

  try {
    const response1 = await db.findOne({_id : id});

    res.status(200).json(response1.books);
  } catch (error) {
    res.status(400).json({message: `${error}`});
  }

});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  console.log(username + ' ' + password);

  const db = await client.db("mibraryData").collection("users");

  try {
    const response1 = await db.findOne({userName : username, password : password});

    if(response1 !== null){
      response1.found = 1;
      res.status(200).json(response1);
    }else{
      res.status(200).json({found: 0});
    }

  } catch (error) {
    console.log(error);
    res.status(400).json({message: `${error}`});
  }

});

router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  console.log(username + ' ' + password);

  const db = await client.db("mibraryData").collection("users");

  try {
    const response1 = await db.insertOne({userName : username, password : password, books : []});

    if(response1 !== null){
      response1.found = 1;
      res.status(200).json(response1);
    }else{
      res.status(200).json({found: 0});
    }

  } catch (error) {
    console.log(error);
    res.status(400).json({message: `${error}`});
  }

});

router.get('/:uid/:bid/:shelf/add-book', async (req, res) => {
  const {uid, bid, shelf} = req.params;

  const db = await client.db("mibraryData").collection("users");

  try {
    const user = await db.findOne({_id : ObjectId(uid)});
    
    if(user !== null){
      const shelves = user.shelves;
      shelves[shelf].books.unshift(bid);

      db.updateOne({_id : ObjectId(uid)}, {$set: { shelves : shelves }}, function(err, result){
        if(err){
          throw err;
        }else{
          console.log(ObjectId(uid));
          res.status(200).send(result);
        }
      })
    }else{
      res.status(200).send(user);
    }
    
  } catch (error) {
    console.log(error);
    res.status(400).json({message: `${error}`});
  }
});

router.get('/:uid/:bid/remove', async (req, res) => {
  const {uid, bid} = req.params;

  const db = await client.db("mibraryData").collection("users");

  try {
    const user = await db.findOne({_id : ObjectId(uid)});

    if(user !== null){
      const booksArr = user.books;

      db.updateOne({_id : ObjectId(uid)}, {$set: { books : booksArr.filter(id => id !== bid)}}, function(err, result){
        if(err){
          throw err;
        }else{
          res.status(200).send(result);
        }
      })
    } else {
      res.status(200).send(user);
    }

  } catch (error) {
    console.log(error);
    res.status(400).json({message: `${error}`});
  }
});

module.exports = router;
var express = require('express');
var router = express.Router();
