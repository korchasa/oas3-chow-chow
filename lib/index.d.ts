import { OpenAPIObject } from 'openapi3-ts';
import { RequestMeta, ResponseMeta } from './compiler';
export { default as ChowError } from './error';
export default class ChowChow {
    private compiledPaths;
    constructor(document: OpenAPIObject);
    validateRequest(path: string, request: RequestMeta): void;
    validateResponse(path: string, response: ResponseMeta): void;
    private identifyCompiledPath(path);
}
