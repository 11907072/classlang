import {ValidationChecks, ValidationRegistry } from 'langium';
import { ClassLanguageAstType } from './generated/ast';
import type { ClassLanguageServices } from './class-language-module';


/**
 * Registry for validation checks.
 */
export class ClassLanguageValidationRegistry extends ValidationRegistry {
    constructor(services: ClassLanguageServices) {
        super(services);
        const validator = services.validation.ClassLanguageValidator;
        const checks: ValidationChecks<ClassLanguageAstType> = {
            
        };
        this.register(checks, validator);
    }
}

/**
 * Implementation of custom validations.
 */
export class checkAttributeNameIsUnique {
    

}
