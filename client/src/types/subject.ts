import { IClassType } from "./classtype";

export interface ISubject{
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
    ClassTypes?: IClassType[];
}