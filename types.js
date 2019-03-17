const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLList
    
} = require('graphql');


// Define Movie Type
const movieType = new GraphQLObjectType({
    name: 'Movie',
    fields:()=>({
        _id: { type: GraphQLString },
        link:{type: GraphQLString},
        id:{type:GraphQLString},
        metascore:{type:GraphQLString},
        poster:{type:GraphQLString},
        rating:{type:GraphQLInt},
        synopsis:{type:GraphQLString},
        title:{type:GraphQLString},
        votes:{type:GraphQLInt},
        year: { type: GraphQLInt }     
    })
});
const moviesType=new GraphQLObjectType({
    name:'Movies',
    fields:()=>({
        movies:{type:GraphQLList(movieType)}
    })
})
exports.movieType = movieType;