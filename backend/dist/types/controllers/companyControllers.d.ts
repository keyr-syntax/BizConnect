import { Request, Response } from "express";
export declare const createCompanyDetails: (req: Request, res: Response) => Promise<void>;
export declare const updateCompanyDetails: (req: Request, res: Response) => Promise<void>;
export declare const findAllCompanies: (req: Request, res: Response) => Promise<void>;
export declare const deleteCompany: (req: Request, res: Response) => Promise<void>;
export declare const fetchCompanyByID: (req: Request, res: Response) => Promise<void>;
