import {ValidationAcceptor, ValidationChecks, ValidationRegistry } from 'langium';
import { ClassBlock ,Attribute, ClassLanguageAstType } from './generated/ast';
import type { ClassLanguageServices } from './class-language-module';


/**
 * Registry for validation checks.
 */
export class ClassLanguageValidationRegistry extends ValidationRegistry {
    constructor(services: ClassLanguageServices) {
        super(services);
        const validator = services.validation.ClassLanguageValidator;
        const checks: ValidationChecks<ClassLanguageAstType> = {
            Attribute: validator.uniqueAttribute
        };
        this.register(checks, validator);
    }
}

/**
 * Implementation of custom validations.
 */
export class ClassLanguageValidator {
    uniqueAttribute(Attribute: Attribute, accept: ValidationAcceptor) : void {
        var attributes = this.getParentAttributes(Attribute.$container.$container);
        attributes.forEach( function(attribute){
            if(Attribute.name == attribute.name && !(Attribute === attribute)){
                accept("error","YOU WERE WRONG!",{node: Attribute, property: 'name'});
            }
        })
    }

    getParentAttributes(ClassBlock: ClassBlock) : Attribute[] {
        var returnArray: Attribute[] = [];
        ClassBlock.attributes.forEach( function (choice){
            returnArray.push(choice.attribute);
        }
        )
        if (ClassBlock.$container.extension != null){
                returnArray = returnArray.concat(this.getParentAttributes(ClassBlock.$container.extension.class.ref!.classBlock));
            
        }
        return returnArray;

    }
}