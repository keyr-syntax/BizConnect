import { sequelize } from "../config/database";
import { DataTypes, Model } from "sequelize";

class COMPANY_LIST extends Model {
  id!: number;
  companyName!: string;
  companyWebsite!: string;
  companyCategory!: string;
  companyAddress!: string;
  isDraft!: boolean;
}

COMPANY_LIST.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    companyName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    companyWebsite: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    companyCategory: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    companyAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isDraft: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize,
    modelName: "COMPANY_LIST",
    tableName: "COMPANY_LIST",
    timestamps: true,
  }
);

export default COMPANY_LIST;
