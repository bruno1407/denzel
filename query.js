const {  GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLList
} = require('graphql');
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const _=require('lodash');
const collectionMovie=require('./movies.json');
const uri = "mongodb+srv://bruno:azertyuiop@cluster0-8nvxw.mongodb.net/ListOfMovie?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });

const {movieType} = require('./types.js');
let {movies} = require('./sandbox.js');

var collection;
client.connect(err => {    
    collection = client.db("ListOfMovie").collection("Movie");
    
})
//Define the Query
const queryType = new GraphQLObjectType({
    name: 'Query',
    fields: {

        movieID: {
            type: movieType,
            
            args: {
                id: { type: GraphQLString }
            },
            resolve: function (source, args) {
               console.log(args.id);
                return _.find(collectionMovie,{id:args.id});
            }
        },
        movie: {
            type: new GraphQLList(movieType) ,         
            //args:{},
            resolve: function (source, args) {
               
                return _.filter(collectionMovie,{metascore:61});
            }
        },
        search:{
            type:new GraphQLList(movieType),
            args:{
                limit:{type:GraphQLInt},
                metascore:{type:GraphQLInt}
            },
            resolve: function(source,args){
                return _.filter(collectionMovie,{metascore:args.metascore})
            }
        }
    }
});

exports.queryType = queryType;