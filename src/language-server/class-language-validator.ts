import {ValidationAcceptor, ValidationChecks, ValidationRegistry } from 'langium';
import { Attribute, ClassLanguageAstType, Enum, Class, Function, AbstractClass } from './generated/ast';
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
            Enum: [validator.uniqueContainerName],
            Class: [validator.validExtension, validator.uniqueContainerName],
            AbstractClass: [validator.uniqueContainerName],
            Function: validator.uniqueFunction
            
        };
        this.register(checks, validator);
    }
}

/**
 * Implementation of custom validations.
 */
export class ClassLanguageValidator {
    uniqueContainerName(object: Class | AbstractClass | Enum, accept: ValidationAcceptor){
        var names = this.getAllOtherNames(object);
        names.forEach( function(name){
            if(object.name == name){
                accept("error","names of classes, enums and abstract classes have to be unique",{node: object, property: 'name'});
            }
        })
    }


    getAllOtherNames(object: Class | AbstractClass | Enum): string[] {
        var names: string[] = [];
        object.$container.classes.forEach( function(Class){
            if(!(object === Class)){
                names.push(Class.name)
            }
            
        })
        object.$container.enums.forEach( function(Enum){
            if(!(object === Enum)){
                names.push(Enum.name)
            }
        })
        object.$container.abstractClasses.forEach( function(AbstractClass){
            if(!(object === AbstractClass)){
                names.push(AbstractClass.name)
            }
        })
        return names;
    }

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

    uniqueFunction(Function: Function, accept: ValidationAcceptor) : void {
        var container
        if(Function.$container.$type == "AbstractClass"){
            container = Function.$container as AbstractClass;
            var functions = this.getAbstractParentFunctions(container);
        }
        else{
            container = Function.$container as Class;
            var functions = this.getParentFunctions(container);
        }
        
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
        if(Class.implementation != null){
            returnArray = returnArray.concat(this.getAbstractParentFunctions(Class.implementation?.abstractClass.ref!));
        }
        return returnArray;
    }

    getAbstractParentFunctions(AbstractClass: AbstractClass) : Function[] {
        var returnArray: Function[] = [];
        AbstractClass.functions.forEach(function (choice){
            returnArray.push(choice);
        })
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