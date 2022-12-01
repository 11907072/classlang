"use strict";
/******************************************************************************
 * This file was generated by langium-cli 0.5.0.
 * DO NOT EDIT MANUALLY!
 ******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
exports.reflection = exports.ClassLanguageAstReflection = exports.isVisibility = exports.Visibility = exports.isTypeDefinition = exports.TypeDefinition = exports.isModel = exports.Model = exports.isInputs = exports.Inputs = exports.isInput = exports.Input = exports.isImport = exports.Import = exports.isFunction = exports.Function = exports.isExtension = exports.Extension = exports.isEnumItem = exports.EnumItem = exports.isEnum = exports.Enum = exports.isClass = exports.Class = exports.isAttribute = exports.Attribute = exports.isTypeOutputDefinition = exports.TypeOutputDefinition = exports.isElement = exports.Element = void 0;
/* eslint-disable @typescript-eslint/array-type */
/* eslint-disable @typescript-eslint/no-empty-interface */
const langium_1 = require("langium");
exports.Element = 'Element';
function isElement(item) {
    return exports.reflection.isInstance(item, exports.Element);
}
exports.isElement = isElement;
exports.TypeOutputDefinition = 'TypeOutputDefinition';
function isTypeOutputDefinition(item) {
    return exports.reflection.isInstance(item, exports.TypeOutputDefinition);
}
exports.isTypeOutputDefinition = isTypeOutputDefinition;
exports.Attribute = 'Attribute';
function isAttribute(item) {
    return exports.reflection.isInstance(item, exports.Attribute);
}
exports.isAttribute = isAttribute;
exports.Class = 'Class';
function isClass(item) {
    return exports.reflection.isInstance(item, exports.Class);
}
exports.isClass = isClass;
exports.Enum = 'Enum';
function isEnum(item) {
    return exports.reflection.isInstance(item, exports.Enum);
}
exports.isEnum = isEnum;
exports.EnumItem = 'EnumItem';
function isEnumItem(item) {
    return exports.reflection.isInstance(item, exports.EnumItem);
}
exports.isEnumItem = isEnumItem;
exports.Extension = 'Extension';
function isExtension(item) {
    return exports.reflection.isInstance(item, exports.Extension);
}
exports.isExtension = isExtension;
exports.Function = 'Function';
function isFunction(item) {
    return exports.reflection.isInstance(item, exports.Function);
}
exports.isFunction = isFunction;
exports.Import = 'Import';
function isImport(item) {
    return exports.reflection.isInstance(item, exports.Import);
}
exports.isImport = isImport;
exports.Input = 'Input';
function isInput(item) {
    return exports.reflection.isInstance(item, exports.Input);
}
exports.isInput = isInput;
exports.Inputs = 'Inputs';
function isInputs(item) {
    return exports.reflection.isInstance(item, exports.Inputs);
}
exports.isInputs = isInputs;
exports.Model = 'Model';
function isModel(item) {
    return exports.reflection.isInstance(item, exports.Model);
}
exports.isModel = isModel;
exports.TypeDefinition = 'TypeDefinition';
function isTypeDefinition(item) {
    return exports.reflection.isInstance(item, exports.TypeDefinition);
}
exports.isTypeDefinition = isTypeDefinition;
exports.Visibility = 'Visibility';
function isVisibility(item) {
    return exports.reflection.isInstance(item, exports.Visibility);
}
exports.isVisibility = isVisibility;
class ClassLanguageAstReflection {
    getAllTypes() {
        return ['Attribute', 'Class', 'Element', 'Enum', 'EnumItem', 'Extension', 'Function', 'Import', 'Input', 'Inputs', 'Model', 'TypeDefinition', 'TypeOutputDefinition', 'Visibility'];
    }
    isInstance(node, type) {
        return (0, langium_1.isAstNode)(node) && this.isSubtype(node.$type, type);
    }
    isSubtype(subtype, supertype) {
        if (subtype === supertype) {
            return true;
        }
        switch (subtype) {
            case exports.Class:
            case exports.Enum:
            case exports.Import: {
                return this.isSubtype(exports.Element, supertype);
            }
            case exports.TypeDefinition: {
                return this.isSubtype(exports.TypeOutputDefinition, supertype);
            }
            default: {
                return false;
            }
        }
    }
    getReferenceType(refInfo) {
        const referenceId = `${refInfo.container.$type}:${refInfo.property}`;
        switch (referenceId) {
            case 'Attribute:typeDefinition': {
                return exports.Element;
            }
            case 'Extension:class': {
                return exports.Class;
            }
            case 'Function:typeOutputDefition': {
                return exports.Element;
            }
            case 'Input:typeDefinition': {
                return exports.Element;
            }
            default: {
                throw new Error(`${referenceId} is not a valid reference id.`);
            }
        }
    }
    getTypeMetaData(type) {
        switch (type) {
            case 'Class': {
                return {
                    name: 'Class',
                    mandatory: [
                        { name: 'attributes', type: 'array' },
                        { name: 'functions', type: 'array' }
                    ]
                };
            }
            case 'Enum': {
                return {
                    name: 'Enum',
                    mandatory: [
                        { name: 'enumItems', type: 'array' }
                    ]
                };
            }
            case 'Inputs': {
                return {
                    name: 'Inputs',
                    mandatory: [
                        { name: 'inputs', type: 'array' }
                    ]
                };
            }
            case 'Model': {
                return {
                    name: 'Model',
                    mandatory: [
                        { name: 'classes', type: 'array' },
                        { name: 'enums', type: 'array' },
                        { name: 'imports', type: 'array' }
                    ]
                };
            }
            default: {
                return {
                    name: type,
                    mandatory: []
                };
            }
        }
    }
}
exports.ClassLanguageAstReflection = ClassLanguageAstReflection;
exports.reflection = new ClassLanguageAstReflection();
//# sourceMappingURL=ast.js.map