"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CompiledSchema_1 = require("./CompiledSchema");
class CompiledMediaType {
    constructor(name, mediaType) {
        this.name = name;
        this.compiledSchema = new CompiledSchema_1.default(mediaType.schema);
    }
    validate(value) {
        this.compiledSchema.tryValidate(value);
    }
}
exports.default = CompiledMediaType;
//# sourceMappingURL=CompiledMediaType.js.map