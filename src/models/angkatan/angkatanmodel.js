const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

const Angkatan = sequelize.define(
  "Angkatan",
  {
    id_angkatan: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    kode: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },

    nama: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    create_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },

    update_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },

    delete_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "angkatan",
    timestamps: false,
  }
);

module.exports = Angkatan;