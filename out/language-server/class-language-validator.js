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
            Enum: validator.uniqueContainerName,
            Class: [validator.validExtension, validator.uniqueContainerName],
            AbstractClass: validator.uniqueContainerName,
            Function: validator.uniqueFunction,
            Import: validator.uniqueContainerName
        };
        this.register(checks, validator);
    }
}
exports.ClassLanguageValidationRegistry = ClassLanguageValidationRegistry;
/**
 * Implementation of custom validations.
 */
class ClassLanguageValidator {
    // checks names of all abstract, imported and regular classes + enums for duplicates
    uniqueContainerName(object, accept) {
        var names = this.getAllOtherNames(object);
        names.forEach(function (name) {
            if (object.name == name) {
                accept("error", "names of all classes, enums and abstract classes and imported classes have to be unique", { node: object, property: 'name' });
            }
        });
    }
    // returns a name-list of objects of given types
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
        object.$container.imports.forEach(function (Import) {
            if (!(object === Import)) {
                names.push(Import.name);
            }
        });
        return names;
    }
    // checks names of attributes for duplicates within a straight line in a hierarchy
    uniqueAttribute(attribute, accept) {
        var attributes = this.getParentAttributes(attribute.$container);
        attributes.forEach(function (choice) {
            if (attribute.name == choice.name && !(attribute === choice)) {
                accept("error", "attribute names must be unique (in hierarchy)", { node: attribute, property: 'name' });
            }
        });
    }
    //returns a list of attributes higher up in the hierarchy than the given Class
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
    //checks names of functions for duplicates within a straight line in a hierarchy
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
    //returns a list of functions higher up in the hierarchy than the given Class
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
    //returns a list of functions in an abstract Class
    getAbstractParentFunctions(AbstractClass) {
        var returnArray = [];
        AbstractClass.functions.forEach(function (choice) {
            returnArray.push(choice);
        });
        return returnArray;
    }
    //checks for circles in class extensions
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
                        return;
                    }
                    superClass = superClass.extension.class.ref;
                }
            }
        }
    }
}
exports.ClassLanguageValidator = ClassLanguageValidator;
//# sourceMappingURL=class-language-validator.js.map