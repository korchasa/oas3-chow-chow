"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CompiledPathItem_1 = require("./CompiledPathItem");
const XRegExp = require("xregexp");
class CompiledPath {
    constructor(path, pathItemObject) {
        this.ignoredMatches = ['index', 'input'];
        this.extractPathParams = (path) => {
            const matches = XRegExp.exec(path, this.regex);
            // extract path parameters
            return Object.keys(matches)
                .filter(this.matchFilter.bind(this))
                .reduce((obj, key) => {
                return Object.assign({}, obj, { [key]: matches[key] });
            }, {});
        };
        this.matchFilter = (key) => {
            return isNaN(parseInt(key)) && !this.ignoredMatches.includes(key);
        };
        this.path = path;
        /**
         * The following statement should create Named Capturing Group for
         * each path parameter, for example
         * /pets/{petId} => ^/pets/(?<petId>[^/]+)/?$
         */
        this.regex = XRegExp('^' + path.replace(/\{([^}]*)}/g, '(?<$1>[^/]+)') + '/?$'),
            this.compiledPathItem = new CompiledPathItem_1.default(pathItemObject, path);
    }
    test(path) {
        return XRegExp.test(path, this.regex);
    }
    validateRequest(path, request) {
        return this.compiledPathItem.validateRequest(Object.assign({}, request, { path: this.extractPathParams(path) }));
    }
    validateResponse(response) {
        return this.compiledPathItem.validateResponse(response);
    }
}
exports.default = CompiledPath;
//# sourceMappingURL=CompiledPath.js.map