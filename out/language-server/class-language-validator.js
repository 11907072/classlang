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
        const checks = {
            Attribute: validator.uniqueAttribute
        };
        this.register(checks, validator);
    }
}
exports.ClassLanguageValidationRegistry = ClassLanguageValidationRegistry;
/**
 * Implementation of custom validations.
 */
class ClassLanguageValidator {
    uniqueAttribute(Attribute, accept) {
        var attributes = this.getParentAttributes(Attribute.$container.$container);
        attributes.forEach(function (attribute) {
            if (Attribute.name == attribute.name && !(Attribute === attribute)) {
                accept("error", "YOU WERE WRONG!", { node: Attribute, property: 'name' });
            }
        });
    }
    getParentAttributes(ClassBlock) {
        var returnArray = [];
        ClassBlock.attributes.forEach(function (choice) {
            returnArray.push(choice.attribute);
        });
        if (ClassBlock.$container.extension != null) {
            returnArray = returnArray.concat(this.getParentAttributes(ClassBlock.$container.extension.class.ref.classBlock));
        }
        return returnArray;
    }
}
exports.ClassLanguageValidator = ClassLanguageValidator;
//# sourceMappingURL=class-language-validator.js.map