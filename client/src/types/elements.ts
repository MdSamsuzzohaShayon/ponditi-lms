// ─────────────────────────────────────────────
//  TYPES
// ─────────────────────────────────────────────

import { JSX } from "react";
import { IClassType } from "./classtype";
import { ISubject } from "./subject";
import { ITuitionm } from "./tuitionm";

export interface ISVGBaseProps {
    size?: number;
    color?: string;
}

export interface IDotsGridProps extends ISVGBaseProps {
    cols?: number;
    rows?: number;
    gap?: number;
    dotSize?: number;
}

export interface ICircleRingProps extends ISVGBaseProps {
    strokeWidth?: number;
    dashed?: boolean;
}

export interface IFilterOption {
    label: string;
    icon: JSX.Element | null;
    options: string[];
}

export interface ICourse {
    title: string;
    students: string;
    rating: number;
    price: number;
    level: string;
    instructor: {
        name: string;
        avatar: string;
    };
    image: string;
}

export interface ITestimonial {
    quote: string;
    author: string;
    role: string;
    avatar: string;
    rating: number;
}

export interface IInstructor {
    name: string;
    role: string;
    students: string;
    courses: number;
    subjects: string[];
    image: string;
}

export interface ICategory {
    icon: string;
    title: string;
    courses: number;
    color: string;
}


export interface IStatItemProps {
    number: string;
    label: string;
    s: Record<string, string>
}

export interface IResponseData {
    classTypes: IClassType[];
    subjects: ISubject[];
    tuitionms: ITuitionm[];
}