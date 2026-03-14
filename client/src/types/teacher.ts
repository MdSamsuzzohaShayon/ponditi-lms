import { ICustomer } from "./customer";
import { ETuitionStyle } from "./enums";

// Previour SearchParamsInterface
export interface ISearchParams {
    location: string;
    ClassTypeId: number;
    SubjectId: number;
    tutionplace: ETuitionStyle;
    TuitionmId: number;
    page?: number;
    limit?: number;
    sort?: string;
}

// Previous SearchParamsInterface
export interface ITeachersResponse {
    teachers: ICustomer[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}