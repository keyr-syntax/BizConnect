import { Request, Response } from "express";
export declare const createContactDetails: (req: Request, res: Response) => Promise<void>;
export declare const updateContactDetails: (req: Request, res: Response) => Promise<void>;
export declare const findAllContacts: (req: Request, res: Response) => Promise<void>;
export declare const deleteContact: (req: Request, res: Response) => Promise<void>;
export declare const fetchContactByID: (req: Request, res: Response) => Promise<void>;
export declare const deleteContactAndFetchContactList: (req: Request, res: Response) => Promise<void>;
