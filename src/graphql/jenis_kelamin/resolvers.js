const JenisKelamin = require("../../models/jenis_kelamin/jenisKelamin");
const resolvers = {
    //QUERY
    Query: {
        //GET SEMUA DATA
        jenisKelamin: async () => {
            return await JenisKelamin.findAll({
                order: [
                    ["nama", "ASC"]
                ]
            });
        },
        // CARI DATA BERDASARKAN ID
        jenisKelaminByid: async (__, { id }) => {
            const data = await JenisKelamin.findOne({
                where: {
                    id_jenis_kelamin: id
                }
            });
            if (!data) {
                throw new Error("Jenis kelamin tidak ditemukan");

            }
            return data;
        },

        // CARI DATA BERDASARKAN KODE ATAU NAMA
        cariJenisKelamin: async (__, { keyword }) => {
            const { Op } = require("sequelize");
            return await JenisKelamin.findAll({
                where: {
                    [Op.or]: [
                        {
                            kode: {
                                [Op.like]: '%${keyword}%'
                            }
                        },
                        {
                            nama: {
                                [Op.like]: '%${keyword}%'
                            }
                        }
                    ]
                },
                order: [
                    ["nama","ASC"]
                ]
            });
        }
    },
    Mutation: {
        // TAMBAH
        tambahJenisKelamin: async (__, { input }) => {
            const waktu = new Date();
            return await JenisKelamin.create({
                ...input,
                create_at: waktu,
                update_at: waktu,
                delete_at: null
            });
        },
        // EDIT
        updateJenisKelamin: async (__, { id, input}) => {
            const data = await JenisKelamin.findOne({
                where: {
                    id_jenis_kelamin: id    
                }
            });

            if (!data) {
                throw new Error("Jenis kelamin tidak ditemukan");
            }
            await data.update({
                ...input,
                update_at: new Date()
            });

            return data;
        },
        // SOFT DELETE
        deleteJenisKelamin: async (__, { id }) => {
            const data = await JenisKelamin.findOne({
                where: {
                    id_jenis_kelamin: id
                }
            });
                if (!data) {
                throw new Error("Jenis kelamin tidak ditemukan");
            }
            await data.update({
                ...input,
                delete_at: new Date(),
                update_at: new Date()
            });
            return data;
        },
        // RESTORE
        restoreJenisKelamin: async (__, { id }) => {
            const data = await JenisKelamin.findOne({
                where: {
                    id_jenis_kelamin: id
                }
            });
            if (!data) {
                throw new Error("Jenis kelamin tidak ditemukan");

            }
            await data.update({
                delete_at: null,
                update_at: new Date()
            });
            return data;
        }
    }
};
module.exports = resolvers