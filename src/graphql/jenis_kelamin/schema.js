const typeDefs = '#graphl' 
    type JenisKelamin {
        id_jenis_kelamin: ID!
        kode: String!
        nama: String!
        create_at: String
        update_at: String
        delete_at: String
    }

    input JenisKelaminInput {
        kode: String!
        nama: String!
    }

    extend type Query {
        jenisKelamin: [JenisKelamin]
        jenisKelaminByid(id: ID!): JenisKelamin
        CariJenisKelamin(keyword: String!): [JenisKelamin]
    }

    extend type Mutation {
        tambahJenisKelamin(input: JenisKelaminInput!): JenisKelamin
        updateJenisKelamin(
            id: ID!
            input: JenisKelaminInput!
        ): JenisKelamin
        deleteJenisKelamin(id: ID!): JenisKelamin
        restoreJenisKelamin(id: ID!): JenisKelamin
    }
';
module.exports = typeDefs;