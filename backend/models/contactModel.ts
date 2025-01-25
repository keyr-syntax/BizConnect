import { sequelize } from "../config/database";
import { DataTypes, Model } from "sequelize";

class CONTACT_LIST extends Model {
  id!: number;
  contactName!: string;
  role!: string;
  phone!: number;
  email!: string;
  companyID!: number;
  companyName!: string;
}

CONTACT_LIST.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    contactName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    companyID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    companyName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "CONTACT_LIST",
    tableName: "CONTACT_LIST",
    timestamps: true,
  }
);

export default CONTACT_LIST;
