var MongoClient = require('mongodb').MongoClient;
var format = require('util').format;

MongoClient.connect('mongodb://bruno:azertyuiop@cluster0-shard-00-00-dabor.mongodb.net:27017,cluster0-shard-00-01-dabor.mongodb.net:27017,cluster0-shard-00-02-dabor.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true,useNewUrlParser: true', function (err, db) {
	if (err) {
		throw err;
	} else {
		console.log("successfully connected to the database");
	}
	db.close();
}); 