import { OperationObject } from 'openapi3-ts';
import { RequestMeta, ResponseMeta } from '.';
export default class CompiledOperation {
    private header;
    private query;
    private path;
    private cookie;
    private body?;
    private response;
    constructor(operation: OperationObject);
    validateRequest(request: RequestMeta): void;
    validateResponse(response: ResponseMeta): void;
}
