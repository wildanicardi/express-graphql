const { 
  GraphQLObjectType, GraphQLString, 
  GraphQLID,GraphQLNonNull 
} = require('graphql');

const userType = new GraphQLObjectType({
  name:'user',
  fields:()=>({
    id:{
      type:new GraphQLNonNull(GraphQLID)
    },
    name:{
      type:GraphQLString
    },
    email:{
      type:GraphQLString
    }
  })
});

module.exports =  userType;
