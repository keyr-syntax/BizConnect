"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../config/database");
const sequelize_1 = require("sequelize");
class COMPANY_LIST extends sequelize_1.Model {
}
COMPANY_LIST.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    companyName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    companyWebsite: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    companyCategory: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    companyAddress: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    isDraft: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
}, {
    sequelize: database_1.sequelize,
    modelName: "COMPANY_LIST",
    tableName: "COMPANY_LIST",
    timestamps: true,
});
exports.default = COMPANY_LIST;
