/* eslint-disable no-console, no-process-exit */
const imdb = require('./src/imdb');
var express = require('express');
var hostname = 'localhost'; 
var port = 3000;
const DENZEL_IMDB_ID = 'nm0000243';
var MongoClient = require('mongodb').MongoClient;

var app = express(); 
var myRouter = express.Router();

const uri = "mongodb+srv://bruno:azertyuiop@cluster0-8nvxw.mongodb.net/ListOfMovie?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });


async function sandbox (actor) {
  try {
    app.listen(port, hostname, function(){
      console.log("Mon serveur fonctionne sur http://"+ hostname +":"+port+"\n"); 
    });
    console.log(`📽️  fetching filmography of ${actor}...`);
    const movies = await imdb(actor);  
    const awesome = movies.filter(movie => movie.metascore >= 77);

    client.connect(err => {
     
      const collection = client.db("ListOfMovie").collection("Movie");
      collection.insert(movies, null, function (error, results) {
        if (error) throw error;
    });
      collection.insert(awesome, null, function (error, results) {
        if (error) throw error;
    });
    app.post("/person", (request, response) => {
      collection.insert(request.body, (error, result) => {
          if(error) {
              return response.status(500).send(error);
          }
          response.send(result.result);
      });
    });
    app.get("/people", (request, response) => {
      collection.find({}).toArray((error, result) => {
          if(error) {
              return response.status(500).send(error);
          }
          response.send(result);
      });
  });
      client.close();
    }); 
 
    //process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

sandbox(DENZEL_IMDB_ID);
