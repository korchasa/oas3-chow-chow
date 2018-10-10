"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CompiledParameter_1 = require("./CompiledParameter");
const CompiledRequestBody_1 = require("./CompiledRequestBody");
const CompiledResponse_1 = require("./CompiledResponse");
const error_1 = require("../error");
class CompiledOperation {
    constructor(operation) {
        this.header = {};
        this.query = {};
        this.path = {};
        this.cookie = {};
        this.response = {};
        const parameters = !!operation.parameters ? [...operation.parameters] : [];
        for (const parameter of parameters) {
            switch (parameter.in) {
                case 'header':
                    this.header = Object.assign({}, this.header, { [parameter.name]: new CompiledParameter_1.default(parameter) });
                    break;
                case 'query':
                    this.query = Object.assign({}, this.query, { [parameter.name]: new CompiledParameter_1.default(parameter) });
                    break;
                case 'path':
                    this.path = Object.assign({}, this.path, { [parameter.name]: new CompiledParameter_1.default(parameter) });
                    break;
                case 'cookie':
                    this.cookie = Object.assign({}, this.cookie, { [parameter.name]: new CompiledParameter_1.default(parameter) });
                    break;
                default:
                    throw new error_1.default(`Unsupported Paramter Location`, { in: parameter.in, name: '' });
            }
        }
        if (operation.requestBody) {
            this.body = new CompiledRequestBody_1.default(operation.requestBody);
        }
        this.response = Object.keys(operation.responses).reduce((compiled, status) => {
            compiled[status] = new CompiledResponse_1.default(operation.responses[status]);
            return compiled;
        }, {});
    }
    validateRequest(request) {
        for (const key in this.header) {
            this.header[key].validate(request.header && request.header[key]);
        }
        for (const key in this.query) {
            this.query[key].validate(request.query && request.query[key]);
        }
        for (const key in this.path) {
            this.path[key].validate(request.path && request.path[key]);
        }
        for (const key in this.cookie) {
            this.cookie[key].validate(request.cookie && request.cookie[key]);
        }
        if (this.body) {
            this.body.validate(request.header && request.header['content-type'], request.body);
        }
    }
    validateResponse(response) {
        const compiledResponse = this.response[response.status] || this.response['default'];
        if (compiledResponse) {
            compiledResponse.validate(response);
        }
        else {
            throw new error_1.default('Unsupported Response Status Code', { in: 'Response', name: '' });
        }
    }
}
exports.default = CompiledOperation;
//# sourceMappingURL=CompiledOperation.js.map