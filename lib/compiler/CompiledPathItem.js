"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CompiledOperation_1 = require("./CompiledOperation");
const error_1 = require("../error");
class CompiledPathItem {
    constructor(pathItemObject, path) {
        this.supportedMethod = ['get', 'post', 'put', 'patch', 'delete', 'head', 'options', 'trace'];
        this.compiledOperations = {};
        this.compiledOperations = this.supportedMethod.reduce((compiled, method) => {
            const m = method.toLowerCase();
            if (pathItemObject[m]) {
                compiled[m] = new CompiledOperation_1.default(pathItemObject[m]);
            }
            return compiled;
        }, {});
        this.path = path;
    }
    validateRequest(request) {
        const method = request.method.toLowerCase();
        const compiledOperation = this.compiledOperations[method];
        if (!compiledOperation) {
            throw new error_1.default(`Invalid request method - ${method}`, { in: 'path', name: this.path });
        }
        return compiledOperation.validateRequest(request);
    }
    validateResponse(response) {
        const method = response.method.toLowerCase();
        const compiledOperation = this.compiledOperations[method];
        if (!compiledOperation) {
            throw new error_1.default(`Invalid request method - ${method}`, { in: 'path', name: this.path });
        }
        return compiledOperation.validateResponse(response);
    }
}
exports.default = CompiledPathItem;
//# sourceMappingURL=CompiledPathItem.js.map