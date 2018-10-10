"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CompiledSchema_1 = require("./CompiledSchema");
const error_1 = require("../error");
class CompiledParameter {
    constructor(parameter) {
        /**
         * If in is "header" and the name field is "Accept", "Content-Type" or "Authorization",
         * the parameter definition SHALL be ignored.
         */
        this.ignoreHeaders = ['Accept', 'Content-Type', 'Authorization'];
        this.name = parameter.name;
        this.in = parameter.in;
        this.required = !!parameter.required;
        this.ignored = parameter.in === 'header' && this.ignoreHeaders.includes(parameter.name);
        switch (parameter.in) {
            case 'query':
                // We want to coerce params to array if needed
                this.compiledSchema = new CompiledSchema_1.default(parameter.schema, { coerceTypes: 'array' });
                break;
            case 'path':
                this.compiledSchema = new CompiledSchema_1.default(parameter.schema, { coerceTypes: true });
                break;
            default:
                this.compiledSchema = new CompiledSchema_1.default(parameter.schema);
        }
    }
    validate(value) {
        if (this.ignored) {
            return;
        }
        else if (value) {
            this.compiledSchema.tryValidate(value);
        }
        else if (this.required) {
            throw new error_1.default('Missing required parameter', { in: this.in, name: this.name });
        }
    }
}
exports.default = CompiledParameter;
//# sourceMappingURL=CompiledParameter.js.map