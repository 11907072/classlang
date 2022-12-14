import {ValidationAcceptor, ValidationChecks, ValidationRegistry } from 'langium';
import { Attribute, ClassLanguageAstType, Enum, Class, Function, AbstractClass, Import } from './generated/ast';
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
            Enum: validator.uniqueContainerName,
            Class: [validator.validExtension, validator.uniqueContainerName],
            AbstractClass: validator.uniqueContainerName,
            Function: validator.uniqueFunction,
            Import: validator.uniqueContainerName
            
        };
        this.register(checks, validator);
    }
}

/**
 * Implementation of custom validations.
 */
export class ClassLanguageValidator {
    
    // checks names of all abstract, imported and regular classes + enums for duplicates
    uniqueContainerName(object: Class | AbstractClass | Enum | Import, accept: ValidationAcceptor){
        var names = this.getAllOtherNames(object);
        names.forEach( function(name){
            if(object.name == name){
                accept("error","names of all classes, enums and abstract classes and imported classes have to be unique",{node: object, property: 'name'});
            }
        })
    }

    // returns a name-list of objects of given types
    getAllOtherNames(object: Class | AbstractClass | Enum | Import): string[] {
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
        object.$container.imports.forEach( function(Import){
            if(!(object === Import)){
                names.push(Import.name)
            }
        })
        return names;
    }

    // checks names of attributes for duplicates within a straight line in a hierarchy
    uniqueAttribute(attribute: Attribute, accept: ValidationAcceptor) : void {
        var attributes = this.getParentAttributes(attribute.$container);
        attributes.forEach( function(choice){
            if(attribute.name == choice.name && !(attribute === choice)){
                accept("error","attribute names must be unique (in hierarchy)",{node: attribute, property: 'name'});
            }
        })
    }

    //returns a list of attributes higher up in the hierarchy than the given Class
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

    //checks names of functions for duplicates within a straight line in a hierarchy
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

    //returns a list of functions higher up in the hierarchy than the given Class
    getParentFunctions(Class: Class) : Function[] {
        var returnArray: Function[] = [];
        Class.functions.forEach(function (choice){
            returnArray.push(choice);
        })
        if(Class.extension != null){
            returnArray = returnArray.concat(this.getParentFunctions(Class.extension.class.ref! as Class));
        }
        if(Class.implementation != null){
            returnArray = returnArray.concat(this.getAbstractParentFunctions(Class.implementation?.abstractClass.ref! as AbstractClass));
        }
        return returnArray;
    }

    //returns a list of functions in an abstract Class
    getAbstractParentFunctions(AbstractClass: AbstractClass) : Function[] {
        var returnArray: Function[] = [];
        AbstractClass.functions.forEach(function (choice){
            returnArray.push(choice);
        })
        return returnArray;
    }

    //checks for circles in class extensions
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
                        return;
                    }
                    superClass = superClass.extension.class.ref!;
                    
                }
            }
        }
    }


}