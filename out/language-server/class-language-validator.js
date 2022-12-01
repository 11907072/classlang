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
            Attribute: validator.uniqueAttribute,
            Enum: validator.uniqueEnum,
            Class: [validator.validExtension,
                validator.uniqueClass],
            Function: validator.uniqueFunction
        };
        this.register(checks, validator);
    }
}
exports.ClassLanguageValidationRegistry = ClassLanguageValidationRegistry;
/**
 * Implementation of custom validations.
 */
class ClassLanguageValidator {
    uniqueAttribute(attribute, accept) {
        var attributes = this.getParentAttributes(attribute.$container);
        attributes.forEach(function (choice) {
            if (attribute.name == choice.name && !(attribute === choice)) {
                accept("error", "attribute names must be unique (in hierarchy)", { node: attribute, property: 'name' });
            }
        });
    }
    getParentAttributes(Class) {
        var returnArray = [];
        Class.attributes.forEach(function (attribute) {
            returnArray.push(attribute);
        });
        if (Class.extension != null) {
            returnArray = returnArray.concat(this.getParentAttributes(Class.extension.class.ref));
        }
        return returnArray;
    }
    uniqueEnum(Enum, accept) {
        var enums = Enum.$container.enums;
        enums.forEach(function (choice) {
            if (choice.name == Enum.name && !(choice === Enum)) {
                accept("error", "enum names must be unique (globally)", { node: Enum, property: 'name' });
            }
        });
    }
    uniqueClass(Class, accept) {
        var classes = Class.$container.classes;
        classes.forEach(function (choice) {
            if (Class.name == choice.name && !(choice === Class)) {
                accept("error", "class names must be unique (globally)", { node: Class, property: 'name' });
            }
        });
    }
    uniqueFunction(Function, accept) {
        var functions = this.getParentFunctions(Function.$container);
        functions.forEach(function (choice) {
            if (Function.name == choice.name && !(Function === choice)) {
                accept("error", "function names must be unique (in hierarchy)", { node: Function, property: 'name' });
            }
        });
    }
    getParentFunctions(Class) {
        var returnArray = [];
        Class.functions.forEach(function (choice) {
            returnArray.push(choice);
        });
        if (Class.extension != null) {
            returnArray = returnArray.concat(this.getParentFunctions(Class.extension.class.ref));
        }
        return returnArray;
    }
    validExtension(Class, accept) {
        if (Class.extension != null) {
            var superClass = Class.extension.class.ref;
            if (Class.name == superClass.name) {
                accept("error", "class cannot extend itself", { node: Class, property: 'name' });
            }
            else {
                while (superClass.extension != null) {
                    if (Class.name == superClass.name) {
                        accept("error", "class extensions must be acyclic", { node: Class, property: 'name' });
                        break;
                    }
                    superClass = superClass.extension.class.ref;
                }
            }
        }
    }
}
exports.ClassLanguageValidator = ClassLanguageValidator;
//# sourceMappingURL=class-language-validator.js.map