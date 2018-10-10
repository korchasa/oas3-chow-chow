"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ChowError extends Error {
    constructor(message, meta) {
        // Pass remaining arguments (including vendor specific ones) to parent constructor
        super(message);
        // Custom debugging information
        this.meta = meta;
    }
    toJSON() {
        return {
            code: this.meta.code || 400,
            location: {
                in: this.meta.in,
                name: this.meta.name
            },
            message: this.message,
            rawErrors: this.meta.rawErrors || []
        };
    }
}
exports.default = ChowError;
//# sourceMappingURL=error.js.map