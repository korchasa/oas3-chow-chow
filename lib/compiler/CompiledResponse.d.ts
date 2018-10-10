import { ResponseObject } from 'openapi3-ts';
import { ResponseMeta } from '.';
export default class CompiledResponse {
    private headers;
    private content;
    constructor(response: ResponseObject);
    validate(response: ResponseMeta): void;
}
