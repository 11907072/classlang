"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createClassLanguageServices = exports.ClassLanguageModule = void 0;
const langium_1 = require("langium");
const module_1 = require("./generated/module");
const class_language_validator_1 = require("./class-language-validator");
/**
 * Dependency injection module that overrides Langium default services and contributes the
 * declared custom services. The Langium defaults can be partially specified to override only
 * selected services, while the custom services must be fully specified.
 */
exports.ClassLanguageModule = {
    validation: {
        ValidationRegistry: (services) => new class_language_validator_1.ClassLanguageValidationRegistry(services),
        ClassLanguageValidator: () => new class_language_validator_1.ClassLanguageValidator()
    }
};
/**
 * Create the full set of services required by Langium.
 *
 * First inject the shared services by merging two modules:
 *  - Langium default shared services
 *  - Services generated by langium-cli
 *
 * Then inject the language-specific services by merging three modules:
 *  - Langium default language-specific services
 *  - Services generated by langium-cli
 *  - Services specified in this file
 *
 * @param context Optional module context with the LSP connection
 * @returns An object wrapping the shared services and the language-specific services
 */
function createClassLanguageServices(context) {
    const shared = (0, langium_1.inject)((0, langium_1.createDefaultSharedModule)(context), module_1.ClassLanguageGeneratedSharedModule);
    const ClassLanguage = (0, langium_1.inject)((0, langium_1.createDefaultModule)({ shared }), module_1.ClassLanguageGeneratedModule, exports.ClassLanguageModule);
    shared.ServiceRegistry.register(ClassLanguage);
    return { shared, ClassLanguage };
}
exports.createClassLanguageServices = createClassLanguageServices;
//# sourceMappingURL=class-language-module.js.map