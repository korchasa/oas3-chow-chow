import { ParameterObject } from 'openapi3-ts';
export default class CompiledParameter {
    private name;
    private in;
    private required;
    private ignored;
    private compiledSchema;
    /**
     * If in is "header" and the name field is "Accept", "Content-Type" or "Authorization",
     * the parameter definition SHALL be ignored.
     */
    private ignoreHeaders;
    constructor(parameter: ParameterObject);
    validate(value: any): void;
}
