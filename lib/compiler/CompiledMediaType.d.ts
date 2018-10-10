import { MediaTypeObject } from 'openapi3-ts';
export default class CompiledMediaType {
    private name;
    private compiledSchema;
    constructor(name: string, mediaType: MediaTypeObject);
    validate(value: any): void;
}
