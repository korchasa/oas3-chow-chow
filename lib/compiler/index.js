"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CompiledPath_1 = require("./CompiledPath");
const deref = require("json-schema-deref-sync");
function compile(oas) {
    const document = deref(oas);
    return Object.keys(document.paths).map((path) => {
        const pathItemObject = document.paths[path];
        // TODO: support for base path
        return new CompiledPath_1.default(path, pathItemObject);
    });
}
exports.default = compile;
//# sourceMappingURL=index.js.map