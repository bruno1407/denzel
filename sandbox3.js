const Express = require("express");
const BodyParser = require("body-parser");
const imdb = require('./src/imdb');
const DENZEL_IMDB_ID = 'nm0000243';
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;

const uri = "mongodb+srv://bruno:azertyuiop@cluster0-8nvxw.mongodb.net/ListOfMovie?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });

var app = Express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

var database, collection;

async function sandbox (actor) {
    try {
        app.listen(3000, () => {          
            client.connect(err => {    
                collection = client.db("ListOfMovie").collection("Movie");
                
            });
        });
        app.get("/movies/search", (request, response) => {
            req=request.query;
            var metascore=parseInt(req.metascore)
            var limit=parseInt(req.limit)
            console.log(req.limit);
            collection.find({"metascore":{$gte:metascore}}).limit(limit).toArray((error, result) => {
                if(error) {
                    return response.status(500).send(error);
                }
                response.send(result);
            });
        });
        app.get("/movies/populate", async function (request, response) {
            const movies = await imdb(actor);
            client.connect(err => {    
                const collection = client.db("ListOfMovie").collection("Movie");
                collection.insert(movies, null, function (error, results) {
                  if (error) throw error;
                  console.log("Donnée ajouté a MongoDB")
              });
            });
            response.send(movies);
        });
        app.get("/movies", (request, response) => {
            collection.find({"metascore":{$gte:70}}).toArray((error, result) => {
                if(error) {
                    return response.status(500).send(error);
                }
                response.send(result);
            });
        });

        app.get("/movies/:id", (request, response) => {
            collection.findOne({ "id": request.params.id }, (error, result) => {
                if(error) {
                    return response.status(500).send(error);
                }
                response.send(result);
            });
        });
        app.post("/movies/:id", (request, response) => {
            req=request.body;
            collection.updateOne({id:request.params.id},{$set:{date:req.date,review:req.review}},(error, result) => {           
                if(error) {
                    return response.status(500).send(error);
                }           
                response.send(result)          
            });
        });
    }catch (e) {
    console.error(e);
    process.exit(1);
  }
}

sandbox(DENZEL_IMDB_ID);
