const Express = require("express");
const BodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;

const CONNECTION_URL = "mongodb+srv://bruno:azertyuiop@cluster0-8nvxw.mongodb.net/ListOfMovie?retryWrites=true";
const DATABASE_NAME = "ListOfMovie";

var app = Express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

var database, collection;

app.listen(3000, () => {
    MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
        if(error) {
            throw error;
        }
        database = client.db(DATABASE_NAME);
        collection = database.collection("Movie");
        console.log("Connected to `" + DATABASE_NAME + "`!");
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
app.get("/movies/populate", (request, response) => {
    collection.find({}).toArray((error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
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
    collection.update({id:request.params.id},{$set:{date:req.date,review:req.review}},(error, result) => {           
        if(error) {
            return response.status(500).send(error);
        }           
            response.send(result)          
        });
});