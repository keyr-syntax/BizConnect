import { Model } from "sequelize";
declare class CONTACT_LIST extends Model {
    id: number;
    contactName: string;
    role: string;
    phone: number;
    email: string;
    companyID: number;
    companyName: string;
}
export default CONTACT_LIST;
