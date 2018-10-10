import { OpenAPIObject } from "openapi3-ts";
import CompiledPath from "./CompiledPath";
export interface RequestMeta {
    method: string;
    query?: any;
    header?: any;
    path?: any;
    cookie?: any;
    body?: any;
}
export interface ResponseMeta {
    method: string;
    status: number;
    header: {
        "content-type": string;
        [key: string]: string;
    };
    body?: any;
}
export default function compile(oas: OpenAPIObject): CompiledPath[];
