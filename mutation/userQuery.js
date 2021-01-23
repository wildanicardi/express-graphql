const { 
  GraphQLObjectType,GraphQLList,GraphQLID,GraphQLString
} = require('graphql');
const User = require('../models/User');
const userType = require('../schemas/userSchema');

var fakeUserDatabase = [
  { name:"ALi 1", email:"ali@mail.com" , id:1},
  { name: "ALi 2", email:"ali@mail.com", id: 2},
  { name: "ALi 3", email:"ali@mail.com", id: 3 }
]
const userQuery = new GraphQLObjectType({
  name:'userQuery',
  fields:() => {
    return {
      users:{
        type: new GraphQLList(userType),
        resolve: async (parent,args) => {
          const users = await User.find({});
          return users
        }
      },
      user:{
        type:userType,
        args:{
          id:{type:GraphQLID}
        },
        resolve: async(parent,args) => {
          const user = await User.findById(args.id);
          return user
        }
      }
    }
  }
});
module.exports = {
  userQuery
}