"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = require("../error");
const CompiledHeader_1 = require("./CompiledHeader");
const CompiledMediaType_1 = require("./CompiledMediaType");
class CompiledResponse {
    constructor(response) {
        this.headers = {};
        this.content = {};
        if (response.headers) {
            this.headers = Object.keys(response.headers).reduce((compiled, name) => {
                compiled[name] = new CompiledHeader_1.default(Object.assign({}, response.headers[name], { name }));
                return compiled;
            }, {});
        }
        if (response.content) {
            this.content = Object.keys(response.content).reduce((compiled, name) => {
                compiled[name] = new CompiledMediaType_1.default(name, response.content[name]);
                return compiled;
            }, {});
        }
    }
    validate(response) {
        const headers = response.header || {};
        for (const key in this.headers) {
            this.headers[key].validate(headers[key]);
        }
        if (this.content[headers['content-type']]) {
            this.content[headers['content-type']].validate(response.body);
        }
        else {
            throw new error_1.default('Unsupported Response Media Type', { in: 'Response', name: '' });
        }
    }
}
exports.default = CompiledResponse;
//# sourceMappingURL=CompiledResponse.js.map