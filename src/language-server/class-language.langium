grammar ClassLanguage

entry Model:
    (classes+=Class | enums+=Enum )* (relationships+=Relationship)*;

Relationship:
    associations+=Association|compositions+=Composition|inheritances+=Inheritance|aggregations+=Aggregation;

Association:
    'association' RelationshipItem RelationshipLabel? '<=>' RelationshipItem RelationshipLabel?;

Composition:
    'composition' RelationshipItem RelationshipLabel?'=>' RelationshipItem RelationshipLabel?;

Aggregation:
    'aggregation' RelationshipItem RelationshipLabel? '=>' RelationshipItem RelationshipLabel?;

Inheritance:
    'inheritance' RelationshipItem '=>' RelationshipItem;

RelationshipItem:
    class=[Class] cardinality=Cardinality;

RelationshipLabel:
    Visibility name=ID;

Cardinality:
    "(" amt=(INT|"*"|"+")")";

Class:
    'Class' (name = ID) extension=(Extension)? classBlock=ClassBlock;

Extension:
    'extends' class=[Class];

ClassBlock:
    '{' (attributes += AttributeChoice)* (functions += FunctionChoice)* '}';
    
AttributeChoice:
    'attribute' Visibility (attribute=Attribute);

FunctionChoice:
    'function' Visibility (function = Function);

Enum:
    'Enum' (name=ID) enumBlock=EnumBlock;

EnumBlock:
    '{' (enumItems+=EnumItem)* '}';

EnumItem:
    (name = ID);

Attribute:
     (name = ID) ":" (typeDefinition=[Element]|TypeDefinition);

Element:
    (Class | Enum);

Function:
    (name = ID) Inputs ":" (typeOutputDefition=[Element]|TypeOutputDefinition) ;

Inputs:
    "(" ((inputs+=Input) ("," inputs+=Input)*)? ")";

Input:
    (name = ID) ":" (typeDefinition=[Element]|TypeDefinition) ("[]")?;

TypeDefinition:
    data=("int" | "string" | "DateTime" );

Visibility:
    visibility=('#'|'+'|'-');


TypeOutputDefinition:
    TypeDefinition | "void";

hidden terminal WS: /\s+/;
terminal DATAINT: "int";
terminal DATASTRING: "string";
terminal DATADATETIME: "DateTime";
terminal ID: /[_a-zA-Z][\w_]*/;
terminal INT returns number: /[0-9]+/;
terminal STRING: /"[^"]*"|'[^']*'/;
terminal VISIBILITY: /[#+-]/;


hidden terminal ML_COMMENT: /\/\*[\s\S]*?\*\//;
hidden terminal SL_COMMENT: /\/\/[^\n\r]*/;
