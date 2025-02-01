import { Model } from "sequelize";
declare class COMPANY_LIST extends Model {
    id: number;
    companyName: string;
    companyWebsite: string;
    companyCategory: string;
    companyAddress: string;
    isDraft: boolean;
}
export default COMPANY_LIST;
