"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const databaseSync_1 = __importDefault(require("./config/databaseSync"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const companyRoutes_1 = __importDefault(require("./routes/companyRoutes"));
const contactRoutes_1 = __importDefault(require("./routes/contactRoutes"));
(0, databaseSync_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/company", companyRoutes_1.default);
app.use("/contact", contactRoutes_1.default);
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Backend for BizConnect is working",
    });
});
app.listen(5000, (error) => {
    if (error) {
        console.log("Error while starting server", error);
    }
    else {
        console.log("Server running on PORT:", 5000);
    }
});
