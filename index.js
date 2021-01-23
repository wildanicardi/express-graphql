const express = require('express');
const {graphqlHTTP}  = require('express-graphql');
const graphql = require('graphql');
const mongo = require('mongoose');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser')
const PORT = 8080;
// connect to the database
mongo.connect('mongodb://localhost:27017/expres-graphql', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));
// The root provides a resolver function for each API endpoint
const RootQuery = new graphql.GraphQLObjectType({
  name:'Query',
  fields: () => ({
    hello:{
      type:graphql.GraphQLString,
      resolve:() => "Hello World!!"
    }
  })
});
const {userQuery} = require('./mutation/userQuery');
const { userMutation } = require('./mutation/userMutation');
// Construct a schema, using GraphQL schema language
const schema = new graphql.GraphQLSchema({ query: userQuery, mutation:userMutation });

app.use('/graphql',cors(),
  bodyParser.json(), graphqlHTTP({
  schema:schema,
  graphiql:true
}))
app.get("/",(req,res) => {
  res.send("Hello World!!")
})

app.listen(PORT, () => {
  console.log(`Server running succefully on port ${PORT}`);
})
