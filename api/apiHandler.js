const fs = require('fs');
require('dotenv').config();

// import employeeMS functions from file 
const employeeList = require('./employeeMS').employeeList;
const employeeAdd = require('./employeeMS').employeeAdd;
const employeeById = require('./employeeMS').employeeById;
const employeeDelete = require('./employeeMS').employeeDelete;
const update = require('./employeeMS').update;

// import ApolloServer and UserInputError from apollo-server-express
const {
    ApolloServer,
    UserInputError
} = require('apollo-server-express');

const {
    GraphQLScalarType
} = require('graphql');

const {
    Kind
} = require('graphql/language');

// Graph Ql Date
const GraphQLDate = new GraphQLScalarType({
    name: 'GraphQLDate',
    description: 'A Date() type in GraphQL as a scalar',
    serialize(value) {
        return value.toISOString();
    },
    parseValue(value) {
        const dateValue = new Date(value);
        return isNaN(dateValue) ? undefined : dateValue;
    },
    parseLiteral(ast) {
        if (ast.kind == Kind.STRING) {
            const value = new Date(ast.value);
            return isNaN(value) ? undefined : value;
        }
    },
});

let db;

// function to get the database
function getDb() {
    return db;
}

// resolvers for the GraphQL schema
const resolvers = {
    Query: {
        employeeList,
        employeeById,
    },
    Mutation: {
        employeeAdd,
        employeeDelete,
        update
    },
    GraphQLDate,
};

// ApolloServer instance with the schema and resolvers
const server = new ApolloServer({
    typeDefs: fs.readFileSync('./schema.graphql', 'utf-8'),
    resolvers,
    formatError: error => {
        console.log(error);
        return error;
    },
});

// function to install the ApolloServer as middleware in the Express app
async function installHandler(app) {
    const enableCors = (process.env.ENABLE_CORS || 'true') === 'true';
    await server.start();
    server.applyMiddleware({
        app,
        path: '/graphql',
        cors: enableCors
    });
    return server;
}

// export the installHandler function
module.exports = {
    installHandler
};