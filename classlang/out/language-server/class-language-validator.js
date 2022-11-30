"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassLanguageValidator = exports.ClassLanguageValidationRegistry = void 0;
const langium_1 = require("langium");
/**
 * Registry for validation checks.
 */
class ClassLanguageValidationRegistry extends langium_1.ValidationRegistry {
    constructor(services) {
        super(services);
        const validator = services.validation.ClassLanguageValidator;
        const checks = {};
        this.register(checks, validator);
    }
}
exports.ClassLanguageValidationRegistry = ClassLanguageValidationRegistry;
/**
 * Implementation of custom validations.
 */
class ClassLanguageValidator {
}
exports.ClassLanguageValidator = ClassLanguageValidator;
//# sourceMappingURL=class-language-validator.js.map