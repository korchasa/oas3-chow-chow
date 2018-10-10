import { PathItemObject } from 'openapi3-ts';
import { RequestMeta, ResponseMeta } from '.';
export default class CompiledPathItem {
    private supportedMethod;
    private compiledOperations;
    private path;
    constructor(pathItemObject: PathItemObject, path: string);
    validateRequest(request: RequestMeta): void;
    validateResponse(response: ResponseMeta): void;
}
