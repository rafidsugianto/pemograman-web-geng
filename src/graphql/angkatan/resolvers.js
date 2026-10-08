const { Op } = require("sequelize");
const Angkatan = require("../../models/angkatan/angkatanmodel");

const resolvers = {
    // QUERY
    Query: {
        // GET SEMUA DATA (yang belum dihapus)
        angkatan: async () => {
            return await Angkatan.findAll({
                where: {
                    delete_at: null
                },
                order: [
                    ["nama", "ASC"]
                ]
            });
        },

        // CARI DATA BERDASARKAN ID
        angkatanById: async (_, { id }) => {
            const data = await Angkatan.findOne({
                where: {
                    id_angkatan: id,
                    delete_at: null
                }
            });
            if (!data) {
                throw new Error("Angkatan tidak ditemukan");
            }
            return data;
        },

        // CARI DATA BERDASARKAN KODE ATAU NAMA
        cariAngkatan: async (_, { keyword }) => {
            return await Angkatan.findAll({
                where: {
                    delete_at: null,
                    [Op.or]: [
                        {
                            kode: {
                                [Op.like]: `%${keyword}%`
                            }
                        },
                        {
                            nama: {
                                [Op.like]: `%${keyword}%`
                            }
                        }
                    ]
                },
                order: [
                    ["nama", "ASC"]
                ]
            });
        }
    },

    Mutation: {
        // TAMBAH
        tambahAngkatan: async (_, { input }) => {
            const waktu = new Date();
            return await Angkatan.create({
                ...input,
                create_at: waktu,
                update_at: waktu,
                delete_at: null
            });
        },

        // EDIT
        updateAngkatan: async (_, { id, input }) => {
            const data = await Angkatan.findOne({
                where: {
                    id_angkatan: id,
                    delete_at: null
                }
            });
            if (!data) {
                throw new Error("Angkatan tidak ditemukan");
            }
            await data.update({
                ...input,
                update_at: new Date()
            });
            return data;
        },

        // SOFT DELETE
        deleteAngkatan: async (_, { id }) => {
            const data = await Angkatan.findOne({
                where: {
                    id_angkatan: id,
                    delete_at: null
                }
            });
            if (!data) {
                throw new Error("Angkatan tidak ditemukan");
            }
            const waktu = new Date();
            await data.update({
                delete_at: waktu,
                update_at: waktu
            });
            return data;
        },

        // RESTORE
        restoreAngkatan: async (_, { id }) => {
            const data = await Angkatan.findOne({
                where: {
                    id_angkatan: id
                }
            });
            if (!data) {
                throw new Error("Angkatan tidak ditemukan");
            }
            await data.update({
                delete_at: null,
                update_at: new Date()
            });
            return data;
        }
    }
};

module.exports = resolvers;