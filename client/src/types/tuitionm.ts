import { IClassType } from "./classtype";

export interface ITuitionm {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  ClassTypes?: IClassType[];
}

export interface ITuitionmsResponse {
  tuitionms: ITuitionm[];
}