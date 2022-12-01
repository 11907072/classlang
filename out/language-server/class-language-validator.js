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
            Enum: [validator.uniqueContainerName],
            Class: [validator.validExtension, validator.uniqueContainerName],
            AbstractClass: [validator.uniqueContainerName],
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
    uniqueContainerName(object, accept) {
        var names = this.getAllOtherNames(object);
        names.forEach(function (name) {
            if (object.name == name) {
                accept("error", "names of classes, enums and abstract classes have to be unique", { node: object, property: 'name' });
            }
        });
    }
    getAllOtherNames(object) {
        var names = [];
        object.$container.classes.forEach(function (Class) {
            if (!(object === Class)) {
                names.push(Class.name);
            }
        });
        object.$container.enums.forEach(function (Enum) {
            if (!(object === Enum)) {
                names.push(Enum.name);
            }
        });
        object.$container.abstractClasses.forEach(function (AbstractClass) {
            if (!(object === AbstractClass)) {
                names.push(AbstractClass.name);
            }
        });
        return names;
    }
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
    uniqueFunction(Function, accept) {
        var container;
        if (Function.$container.$type == "AbstractClass") {
            container = Function.$container;
            var functions = this.getAbstractParentFunctions(container);
        }
        else {
            container = Function.$container;
            var functions = this.getParentFunctions(container);
        }
        functions.forEach(function (choice) {
            if (Function.name == choice.name && !(Function === choice)) {
                accept("error", "function names must be unique (in hierarchy)", { node: Function, property: 'name' });
            }
        });
    }
    getParentFunctions(Class) {
        var _a;
        var returnArray = [];
        Class.functions.forEach(function (choice) {
            returnArray.push(choice);
        });
        if (Class.extension != null) {
            returnArray = returnArray.concat(this.getParentFunctions(Class.extension.class.ref));
        }
        if (Class.implementation != null) {
            returnArray = returnArray.concat(this.getAbstractParentFunctions((_a = Class.implementation) === null || _a === void 0 ? void 0 : _a.abstractClass.ref));
        }
        return returnArray;
    }
    getAbstractParentFunctions(AbstractClass) {
        var returnArray = [];
        AbstractClass.functions.forEach(function (choice) {
            returnArray.push(choice);
        });
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