"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const betterAjvErrors = require("better-ajv-errors");
const ajv_1 = require("./ajv");
const noop = (data) => {
    return true;
};
class CompiledSchema {
    constructor(schema, opts) {
        this.schemaObject = schema;
        this.validator = schema ? ajv_1.default(opts).compile(schema) : noop;
    }
    tryValidate(value) {
        const valid = this.validator(value);
        if (!valid) {
            const errorsStr = betterAjvErrors(this.schemaObject, value || {}, this.validator.errors, { format: 'cli', indent: 2 });
            throw new Error("Schema validation error: " + errorsStr);
        }
    }
}
exports.default = CompiledSchema;
//# sourceMappingURL=CompiledSchema.js.map