import { PathItemObject } from 'openapi3-ts';
import { RequestMeta, ResponseMeta } from '.';
export default class CompiledPath {
    private path;
    private regex;
    private compiledPathItem;
    private ignoredMatches;
    constructor(path: string, pathItemObject: PathItemObject);
    test(path: string): boolean;
    validateRequest(path: string, request: RequestMeta): void;
    validateResponse(response: ResponseMeta): void;
    private extractPathParams;
    private matchFilter;
}
