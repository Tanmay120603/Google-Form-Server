import express, { Request, Response } from 'express';
import { promises as fs } from 'fs';
import path from 'path';

const filePath = path.resolve("data", "db.json");

interface FormData {
    [key: string]: any;
}

export const submitForm = async (req: Request, res: Response): Promise<void> => {
    try {
        const formData: FormData[] = JSON.parse(await fs.readFile(filePath, { encoding: "utf-8" }));
        formData.push(req.body);
        await fs.writeFile(filePath, JSON.stringify(formData));
        res.status(201).json("Form submitted successfully");
    } catch (err) {
        res.status(500).json("Internal Server Error");
    }
};

export const readForm = async (req: Request, res: Response): Promise<any> => {
    const index = +req.params.index;
    if (isNaN(index)) return res.status(400).json("Index doesn't exist");
    try {
        const formData: FormData[] = JSON.parse(await fs.readFile(filePath, { encoding: "utf-8" }));
        res.status(200).json(formData[index] || {});
    } catch (err) {
        res.status(500).json("Internal Server Error");
    }
};

export const deleteForm= async(req: Request, res: Response): Promise<any> => {
    const index=+req.params.index;
    if (isNaN(index)) return res.status(400).json("Index doesn't exist");
    try {
        const formData: FormData[] = JSON.parse(await fs.readFile(filePath, { encoding: "utf-8" }));
        formData.splice(index,index+1)
        await fs.writeFile(filePath, JSON.stringify(formData));
        res.status(200).json("Deleted SuccessFully");
    } catch (err) {
        res.status(500).json("Internal Server Error");
    }
}

export const editForm= async(req:Request,res:Response) : Promise<any> => {
    const index=+req.params.index;
    if (isNaN(index)) return res.status(400).json("Index doesn't exist");
    try{
    const formData: FormData[] = JSON.parse(await fs.readFile(filePath, { encoding: "utf-8" }));
    formData[index]={...req.body}
    await fs.writeFile(filePath, JSON.stringify(formData));
    res.status(200).json("Edited SuccessFully");
    } catch(err) {
        res.status(500).json("Internal Server Error");
    }
}  

export const ping = async (req: Request, res: Response): Promise<void> => {
    try {
        const submittedCount = JSON.parse(await fs.readFile(filePath, { encoding: "utf-8" })).length;
        res.status(200).json({ submittedCount, ping: true });
    } catch (err) {
        res.status(500).json("Internal Server Error");
    }
};
