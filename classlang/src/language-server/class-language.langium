grammar ClassLanguage

entry Model:
    (classes+=Class | enums+=Enum )* ;


interface Association {
    
}

Class:
    'Class' (name = ID) (Extension)* ClassBlock ;

Extension:
    'extends' superType=[Class:ID];

ClassBlock:
    '{' (AttributeChoice)* (FunctionChoice)* '}';
    
AttributeChoice:
    'attribute' VISIBILITY (attributes += Attribute);

FunctionChoice:
    'function' VISIBILITY (functions += Function);

Enum:
    'Enum' (name=ID) EnumBlock;

EnumBlock:
    '{' (EnumItem)* '}';

EnumItem:
    (name = ID);

Attribute:
     (name = ID) ":" TypeDefinition;

Function:
    (name = ID) ":" (DATAINT | DATASTRING | DATADATETIME) ;

TypeDefinition:
    enum=[Enum:ID];


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
