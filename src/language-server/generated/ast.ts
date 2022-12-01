/******************************************************************************
 * This file was generated by langium-cli 0.5.0.
 * DO NOT EDIT MANUALLY!
 ******************************************************************************/

/* eslint-disable @typescript-eslint/array-type */
/* eslint-disable @typescript-eslint/no-empty-interface */
import { AstNode, AstReflection, Reference, ReferenceInfo, isAstNode, TypeMetaData } from 'langium';

export type Aggregation = RelationshipItem | RelationshipLabel;

export const Aggregation = 'Aggregation';

export function isAggregation(item: unknown): item is Aggregation {
    return reflection.isInstance(item, Aggregation);
}

export type Association = RelationshipItem | RelationshipLabel;

export const Association = 'Association';

export function isAssociation(item: unknown): item is Association {
    return reflection.isInstance(item, Association);
}

export type Composition = RelationshipItem | RelationshipLabel;

export const Composition = 'Composition';

export function isComposition(item: unknown): item is Composition {
    return reflection.isInstance(item, Composition);
}

export type Element = Class | Enum;

export const Element = 'Element';

export function isElement(item: unknown): item is Element {
    return reflection.isInstance(item, Element);
}

export type Inheritance = RelationshipItem;

export const Inheritance = 'Inheritance';

export function isInheritance(item: unknown): item is Inheritance {
    return reflection.isInstance(item, Inheritance);
}

export type TypeOutputDefinition = TypeDefinition;

export const TypeOutputDefinition = 'TypeOutputDefinition';

export function isTypeOutputDefinition(item: unknown): item is TypeOutputDefinition {
    return reflection.isInstance(item, TypeOutputDefinition);
}

export interface Attribute extends AstNode {
    readonly $container: AttributeChoice;
    name: string
    typeDefinition: Reference<Element>
}

export const Attribute = 'Attribute';

export function isAttribute(item: unknown): item is Attribute {
    return reflection.isInstance(item, Attribute);
}

export interface AttributeChoice extends AstNode {
    readonly $container: ClassBlock;
    attribute: Attribute
}

export const AttributeChoice = 'AttributeChoice';

export function isAttributeChoice(item: unknown): item is AttributeChoice {
    return reflection.isInstance(item, AttributeChoice);
}

export interface Cardinality extends AstNode {
    readonly $container: RelationshipItem;
    amt: '*' | '+' | number
}

export const Cardinality = 'Cardinality';

export function isCardinality(item: unknown): item is Cardinality {
    return reflection.isInstance(item, Cardinality);
}

export interface Class extends AstNode {
    readonly $container: Model;
    classBlock: ClassBlock
    extension?: Extension
    name: string
}

export const Class = 'Class';

export function isClass(item: unknown): item is Class {
    return reflection.isInstance(item, Class);
}

export interface ClassBlock extends AstNode {
    readonly $container: Class;
    attributes: Array<AttributeChoice>
    functions: Array<FunctionChoice>
}

export const ClassBlock = 'ClassBlock';

export function isClassBlock(item: unknown): item is ClassBlock {
    return reflection.isInstance(item, ClassBlock);
}

export interface Enum extends AstNode {
    readonly $container: Model;
    enumBlock: EnumBlock
    name: string
}

export const Enum = 'Enum';

export function isEnum(item: unknown): item is Enum {
    return reflection.isInstance(item, Enum);
}

export interface EnumBlock extends AstNode {
    readonly $container: Enum;
    enumItems: Array<EnumItem>
}

export const EnumBlock = 'EnumBlock';

export function isEnumBlock(item: unknown): item is EnumBlock {
    return reflection.isInstance(item, EnumBlock);
}

export interface EnumItem extends AstNode {
    readonly $container: EnumBlock;
    name: string
}

export const EnumItem = 'EnumItem';

export function isEnumItem(item: unknown): item is EnumItem {
    return reflection.isInstance(item, EnumItem);
}

export interface Extension extends AstNode {
    readonly $container: Class;
    class: Reference<Class>
}

export const Extension = 'Extension';

export function isExtension(item: unknown): item is Extension {
    return reflection.isInstance(item, Extension);
}

export interface Function extends AstNode {
    readonly $container: FunctionChoice;
    name: string
    typeOutputDefition: Reference<Element>
}

export const Function = 'Function';

export function isFunction(item: unknown): item is Function {
    return reflection.isInstance(item, Function);
}

export interface FunctionChoice extends AstNode {
    readonly $container: ClassBlock;
    function: Function
}

export const FunctionChoice = 'FunctionChoice';

export function isFunctionChoice(item: unknown): item is FunctionChoice {
    return reflection.isInstance(item, FunctionChoice);
}

export interface Input extends AstNode {
    readonly $container: Inputs;
    name: string
    typeDefinition: Reference<Element>
}

export const Input = 'Input';

export function isInput(item: unknown): item is Input {
    return reflection.isInstance(item, Input);
}

export interface Inputs extends AstNode {
    inputs: Array<Input>
}

export const Inputs = 'Inputs';

export function isInputs(item: unknown): item is Inputs {
    return reflection.isInstance(item, Inputs);
}

export interface Model extends AstNode {
    classes: Array<Class>
    enums: Array<Enum>
    relationships: Array<Relationship>
}

export const Model = 'Model';

export function isModel(item: unknown): item is Model {
    return reflection.isInstance(item, Model);
}

export interface Relationship extends AstNode {
    readonly $container: Model;
    aggregations: Array<Aggregation>
    associations: Array<Association>
    compositions: Array<Composition>
    inheritances: Array<Inheritance>
}

export const Relationship = 'Relationship';

export function isRelationship(item: unknown): item is Relationship {
    return reflection.isInstance(item, Relationship);
}

export interface RelationshipItem extends AstNode {
    readonly $container: Relationship;
    cardinality: Cardinality
    class: Reference<Class>
}

export const RelationshipItem = 'RelationshipItem';

export function isRelationshipItem(item: unknown): item is RelationshipItem {
    return reflection.isInstance(item, RelationshipItem);
}

export interface RelationshipLabel extends AstNode {
    readonly $container: Relationship;
    name: string
}

export const RelationshipLabel = 'RelationshipLabel';

export function isRelationshipLabel(item: unknown): item is RelationshipLabel {
    return reflection.isInstance(item, RelationshipLabel);
}

export interface TypeDefinition extends AstNode {
    data: 'DateTime' | 'int' | 'string'
}

export const TypeDefinition = 'TypeDefinition';

export function isTypeDefinition(item: unknown): item is TypeDefinition {
    return reflection.isInstance(item, TypeDefinition);
}

export interface Visibility extends AstNode {
    visibility: '#' | '+' | '-'
}

export const Visibility = 'Visibility';

export function isVisibility(item: unknown): item is Visibility {
    return reflection.isInstance(item, Visibility);
}

export type ClassLanguageAstType = 'Aggregation' | 'Association' | 'Attribute' | 'AttributeChoice' | 'Cardinality' | 'Class' | 'ClassBlock' | 'Composition' | 'Element' | 'Enum' | 'EnumBlock' | 'EnumItem' | 'Extension' | 'Function' | 'FunctionChoice' | 'Inheritance' | 'Input' | 'Inputs' | 'Model' | 'Relationship' | 'RelationshipItem' | 'RelationshipLabel' | 'TypeDefinition' | 'TypeOutputDefinition' | 'Visibility';

export class ClassLanguageAstReflection implements AstReflection {

    getAllTypes(): string[] {
        return ['Aggregation', 'Association', 'Attribute', 'AttributeChoice', 'Cardinality', 'Class', 'ClassBlock', 'Composition', 'Element', 'Enum', 'EnumBlock', 'EnumItem', 'Extension', 'Function', 'FunctionChoice', 'Inheritance', 'Input', 'Inputs', 'Model', 'Relationship', 'RelationshipItem', 'RelationshipLabel', 'TypeDefinition', 'TypeOutputDefinition', 'Visibility'];
    }

    isInstance(node: unknown, type: string): boolean {
        return isAstNode(node) && this.isSubtype(node.$type, type);
    }

    isSubtype(subtype: string, supertype: string): boolean {
        if (subtype === supertype) {
            return true;
        }
        switch (subtype) {
            case Class:
            case Enum: {
                return this.isSubtype(Element, supertype);
            }
            case RelationshipItem: {
                return this.isSubtype(Association, supertype) || this.isSubtype(Composition, supertype) || this.isSubtype(Aggregation, supertype) || this.isSubtype(Inheritance, supertype);
            }
            case RelationshipLabel: {
                return this.isSubtype(Association, supertype) || this.isSubtype(Composition, supertype) || this.isSubtype(Aggregation, supertype);
            }
            case TypeDefinition: {
                return this.isSubtype(TypeOutputDefinition, supertype);
            }
            default: {
                return false;
            }
        }
    }

    getReferenceType(refInfo: ReferenceInfo): string {
        const referenceId = `${refInfo.container.$type}:${refInfo.property}`;
        switch (referenceId) {
            case 'Attribute:typeDefinition': {
                return Element;
            }
            case 'Extension:class': {
                return Class;
            }
            case 'Function:typeOutputDefition': {
                return Element;
            }
            case 'Input:typeDefinition': {
                return Element;
            }
            case 'RelationshipItem:class': {
                return Class;
            }
            default: {
                throw new Error(`${referenceId} is not a valid reference id.`);
            }
        }
    }

    getTypeMetaData(type: string): TypeMetaData {
        switch (type) {
            case 'ClassBlock': {
                return {
                    name: 'ClassBlock',
                    mandatory: [
                        { name: 'attributes', type: 'array' },
                        { name: 'functions', type: 'array' }
                    ]
                };
            }
            case 'EnumBlock': {
                return {
                    name: 'EnumBlock',
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
                        { name: 'relationships', type: 'array' }
                    ]
                };
            }
            case 'Relationship': {
                return {
                    name: 'Relationship',
                    mandatory: [
                        { name: 'aggregations', type: 'array' },
                        { name: 'associations', type: 'array' },
                        { name: 'compositions', type: 'array' },
                        { name: 'inheritances', type: 'array' }
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

export const reflection = new ClassLanguageAstReflection();
