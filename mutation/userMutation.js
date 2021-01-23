const { 
  GraphQLObjectType,GraphQLString,GraphQLNonNull
} = require('graphql');
const User = require('../models/User');
const userType = require('../schemas/userSchema');

const userMutation = new GraphQLObjectType({
  name:'userMutation',
  fields:{
    addUser:{
      type:userType,
      args:{
        id:{ type:GraphQLString},
        name:{ type:GraphQLString},
        email:{ type:GraphQLString},
      },
      resolve:async(parent,{id,name,email}) => {
        let user = await new User({id,name,email});
        if (!user) {
          throw new Error('error Create User')
        }
        return user.save();
      }
    },
    updateUser:{
      type:userType,
      args:{
        id:{ type:new GraphQLNonNull(GraphQLString)},
        name:{ type:GraphQLString},
        email:{ type:GraphQLString},
      },
      resolve:async (parent,{id,name,email}) => {
        const updateUser = await User.findOneAndUpdate({ id }, { $set: { name, email } });
        if (!updateUser) {
          throw new Error('error Update user')
        }
        return updateUser;
      }
    },
    removeUser:{
      type:userType,
      args:{
        id:{ type:new GraphQLNonNull(GraphQLString)}
      },
      resolve:async (parent,args) => {
        const deleteUser = await User.findOneAndRemove(args.id);
        if (!deleteUser) {
          throw new Error('error delete User')
        }
        return deleteUser;
      }
    }
  }
})
module.exports = {
  userMutation
}