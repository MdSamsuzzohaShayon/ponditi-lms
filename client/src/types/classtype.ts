import { ISubject } from "./subject";
import { ITuitionm } from "./tuitionm";

export interface IClassType {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
    Tuitionms?: ITuitionm[];
    Subjects?: ISubject[];
}