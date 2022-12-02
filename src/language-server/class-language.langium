grammar ClassLanguage

entry Model:
    (imports+=Import)* (classes+=Class | enums+=Enum |abstractClasses+=AbstractClass )*;

Import:
    'import' name=ID;

Class:
    'Class' (name=ID) extension=(Extension)? implementation=(Implementation)? '{' (attributes+=Attribute)* (functions+=Function)* '}';

Extension:
    'extends' class=[Class];

Implementation:
    'implements' abstractClass=[AbstractClass];

AbstractClass:
    'abstract' 'Class' (name=ID) '{' (functions+=Function)* '}';

Enum:
    'Enum' (name=ID) '{' (enumItems+=EnumItem)* '}';

EnumItem:
    (name=ID);

Attribute:
    'attribute' visibility=Visibility (name=ID) ":" (typeDefinition=[Element]("[]")?|typeDefinition=TypeDefinition)?;

Function:
    'function' visibility=Visibility (name=ID) "("inputs=Inputs?")" ":" (typeOutputDefition=[Element]("[]")?|typeOutputDefition=TypeOutputDefinition)?;

Element:
    (Class | Enum | Import);

Inputs:
    ((inputs+=Input) ("," inputs+=Input)*)?;

Input:
    (name=ID) ":" (typeDefinition=[Element]("[]")?|typeDefinition=TypeDefinition)?;

TypeDefinition:
    data=("int" | "string" | "DateTime" )("[]")?;

Visibility:
    visibility=('#'|'+'|'-');

TypeOutputDefinition:
    TypeDefinition | "void";

hidden terminal WS: /\s+/;
terminal ID: /[_a-zA-Z][\w_]*/;
terminal INT returns number: /[0-9]+/;
terminal STRING: /"[^"]*"|'[^']*'/;


hidden terminal ML_COMMENT: /\/\*[\s\S]*?\*\//;
hidden terminal SL_COMMENT: /\/\/[^\n\r]*/;
