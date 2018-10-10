"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CompiledSchema_1 = require("./CompiledSchema");
const error_1 = require("../error");
class CompiledRequestBody {
    constructor(requestBody) {
        this.compiledSchemas = Object.keys(requestBody.content).reduce((compiled, mediaType) => {
            compiled[mediaType] = new CompiledSchema_1.default(requestBody.content[mediaType].schema);
            return compiled;
        }, {});
        this.required = !!requestBody.required;
    }
    validate(mediaType, value) {
        if (this.required && !value) {
            throw new error_1.default('Missing required body', { in: 'Request Body', name: '' });
        }
        if (!this.required && !value) {
            return;
        }
        if (!this.compiledSchemas[mediaType]) {
            throw new error_1.default(`Unsupported mediaType: ${mediaType}`, { in: 'Request Body', name: 'media types' });
        }
        this.compiledSchemas[mediaType].tryValidate(value);
    }
}
exports.default = CompiledRequestBody;
//# sourceMappingURL=CompiledRequestBody.js.map