"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const compiler_1 = require("./compiler");
const error_1 = require("./error");
var error_2 = require("./error");
exports.ChowError = error_2.default;
class ChowChow {
    constructor(document) {
        this.compiledPaths = compiler_1.default(document);
    }
    validateRequest(path, request) {
        const compiledPath = this.identifyCompiledPath(path);
        return compiledPath.validateRequest(path, request);
    }
    validateResponse(path, response) {
        const compiledPath = this.identifyCompiledPath(path);
        return compiledPath.validateResponse(response);
    }
    identifyCompiledPath(path) {
        const compiledPath = this.compiledPaths.find((cp) => {
            return cp.test(path);
        });
        if (!compiledPath) {
            throw new error_1.default(`No matches found for the given path - ${path}`, { in: 'paths', name: '', code: 404 });
        }
        return compiledPath;
    }
}
exports.default = ChowChow;
//# sourceMappingURL=index.js.map