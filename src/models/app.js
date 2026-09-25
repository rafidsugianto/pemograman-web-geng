const express = require("express");
const cors = require("cors");
const app = express();

const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@as-integrations/express5");

// GraphQl Schema
const typeDefs = require("../graphql/jenis_kelamin/schema");

//GraphQl Resolvers
const jenisKelaminResolvers = require("../graphql/jenis_kelamin/resolvers");

const resolvers = [
    jenisKelaminResolvers

];

app.use(cors());
app.use(express.json());
console.log("Port dari .env:" , process.env.PORT);

app.get("/", (req, res) => {
    res.json({
        message: "API Mahasiswa berjalan Dan Sukse",
        port: process.env.PORT
    });
});
// GraphQL
const server = new ApolloServer({
    typeDefs,
    resolvers
});

async function startGraphQL() {
    await server.start();
    app.use(
        "/graphql",
        expressMiddleware(server)
    );
}

startGraphQL();
module.exports = app;