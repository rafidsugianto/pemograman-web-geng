const express = require("express");
const cors = require("cors");

const app = express();

const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@as-integrations/express5");

// GraphQL Schema
const jenisKelaminSchema = require("../graphql/jenis_kelamin/schema");
const angkatanSchema = require("../graphql/angkatan/schema");

// GraphQL Resolvers
const jenisKelaminResolvers = require("../graphql/jenis_kelamin/resolvers");
const angkatanResolvers = require("../graphql/angkatan/resolvers");

// Gabungkan Schema
const typeDefs = [
    jenisKelaminSchema,
    angkatanSchema
];

// Gabungkan Resolvers
const resolvers = [
    jenisKelaminResolvers,
    angkatanResolvers
];

app.use(cors());
app.use(express.json());

console.log("Port dari .env:", process.env.PORT);

app.get("/", (req, res) => {
    res.json({
        message: "API Mahasiswa berjalan Dan Sukses",
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