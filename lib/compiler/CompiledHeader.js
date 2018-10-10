"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CompiledSchema_1 = require("./CompiledSchema");
const error_1 = require("../error");
class CompiledHeader {
    constructor(header) {
        this.in = 'header';
        /**
         * If a response header is defined with the name "Content-Type", it SHALL be ignored.
         */
        this.ignoreHeaders = ['Content-Type'];
        this.name = header.name;
        this.required = !!header.required;
        this.ignored = this.ignoreHeaders.includes(header.name);
        this.compiledSchema = new CompiledSchema_1.default(header.schema);
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
exports.default = CompiledHeader;
//# sourceMappingURL=CompiledHeader.js.map