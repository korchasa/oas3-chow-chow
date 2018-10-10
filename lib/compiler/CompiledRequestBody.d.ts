import { RequestBodyObject } from 'openapi3-ts';
export default class CompiledRequestBody {
    private compiledSchemas;
    private required;
    constructor(requestBody: RequestBodyObject);
    validate(mediaType: string, value: any): void;
}
