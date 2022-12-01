import {ValidationAcceptor, ValidationChecks, ValidationRegistry } from 'langium';
import { Attribute, ClassLanguageAstType, Enum, Class, Function } from './generated/ast';
import type { ClassLanguageServices } from './class-language-module';


/**
 * Registry for validation checks.
 */
export class ClassLanguageValidationRegistry extends ValidationRegistry {
    constructor(services: ClassLanguageServices) {
        super(services);
        const validator = services.validation.ClassLanguageValidator;
        const checks: ValidationChecks<ClassLanguageAstType> = {
            Attribute: validator.uniqueAttribute,
            Enum: validator.uniqueEnum,
            Class: [validator.validExtension,
            validator.uniqueClass],
            Function: validator.uniqueFunction
        };
        this.register(checks, validator);
    }
}

/**
 * Implementation of custom validations.
 */
export class ClassLanguageValidator {
    uniqueAttribute(attribute: Attribute, accept: ValidationAcceptor) : void {
        var attributes = this.getParentAttributes(attribute.$container);
        attributes.forEach( function(choice){
            if(attribute.name == choice.name && !(attribute === choice)){
                accept("error","attribute names must be unique (in hierarchy)",{node: attribute, property: 'name'});
            }
        })
    }

    getParentAttributes(Class: Class) : Attribute[] {
        var returnArray: Attribute[] = [];
        Class.attributes.forEach( function (attribute){
            returnArray.push(attribute);
        }
        )
        if (Class.extension != null){
                returnArray = returnArray.concat(this.getParentAttributes(Class.extension.class.ref!));
            
        }
        return returnArray;

    }

    uniqueEnum(Enum: Enum, accept: ValidationAcceptor) : void {
        var enums = Enum.$container.enums;
        enums.forEach( function (choice){
            if(choice.name == Enum.name && !(choice === Enum)){
                accept("error", "enum names must be unique (globally)",{node:Enum, property: 'name'});
            }
        })
    }

    uniqueClass(Class: Class, accept: ValidationAcceptor) : void {
        var classes = Class.$container.classes;
        classes.forEach( function (choice){
            if(Class.name == choice.name && !(choice === Class)){
                accept("error", "class names must be unique (globally)", {node:Class, property: 'name'});
            }
        })
    }

    uniqueFunction(Function: Function, accept: ValidationAcceptor) : void {
        var functions = this.getParentFunctions(Function.$container);
        functions.forEach(function (choice){
            if(Function.name == choice.name && !(Function === choice)){
                accept("error","function names must be unique (in hierarchy)",{node:Function, property: 'name'})
            }
        })
    }

    getParentFunctions(Class: Class) : Function[] {
        var returnArray: Function[] = [];
        Class.functions.forEach(function (choice){
            returnArray.push(choice);
        })
        if(Class.extension != null){
            returnArray = returnArray.concat(this.getParentFunctions(Class.extension.class.ref!));
        }
        return returnArray;
    }

    validExtension(Class: Class, accept: ValidationAcceptor) : void{
        if(Class.extension != null){
            var superClass = Class.extension.class.ref!;
            if(Class.name == superClass.name){
                accept("error", "class cannot extend itself", {node:Class, property:'name'})
            }
            else {
                while(superClass.extension != null){
                    if(Class.name == superClass.name){
                        accept("error", "class extensions must be acyclic", {node:Class, property:'name'})
                        break;
                    }
                    superClass = superClass.extension.class.ref!;
                    
                }
            }
        }
    }


}