"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../config/database");
const sequelize_1 = require("sequelize");
class CONTACT_LIST extends sequelize_1.Model {
}
CONTACT_LIST.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    contactName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: false,
    },
    companyID: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    companyName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: database_1.sequelize,
    modelName: "CONTACT_LIST",
    tableName: "CONTACT_LIST",
    timestamps: true,
});
exports.default = CONTACT_LIST;
