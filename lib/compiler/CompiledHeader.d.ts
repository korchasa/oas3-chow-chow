import { HeaderObject } from 'openapi3-ts';
export default class CompiledHeader {
    private name;
    private in;
    private required;
    private ignored;
    private compiledSchema;
    /**
     * If a response header is defined with the name "Content-Type", it SHALL be ignored.
     */
    private ignoreHeaders;
    constructor(header: HeaderObject);
    validate(value: any): void;
}
