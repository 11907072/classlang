/******************************************************************************
 * This file was generated by langium-cli 0.5.0.
 * DO NOT EDIT MANUALLY!
 ******************************************************************************/

import { loadGrammarFromJson, Grammar } from 'langium';

let loadedClassLanguageGrammar: Grammar | undefined;
export const ClassLanguageGrammar = (): Grammar => loadedClassLanguageGrammar ?? (loadedClassLanguageGrammar = loadGrammarFromJson(`{
  "$type": "Grammar",
  "isDeclared": true,
  "name": "ClassLanguage",
  "rules": [
    {
      "$type": "ParserRule",
      "name": "Model",
      "entry": true,
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Alternatives",
            "elements": [
              {
                "$type": "Assignment",
                "feature": "classes",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$refText": "Class"
                  },
                  "arguments": []
                }
              },
              {
                "$type": "Assignment",
                "feature": "enums",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$refText": "Enum"
                  },
                  "arguments": []
                }
              }
            ],
            "cardinality": "*"
          },
          {
            "$type": "Assignment",
            "feature": "relationships",
            "operator": "+=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$refText": "Relationship"
              },
              "arguments": []
            },
            "cardinality": "*"
          }
        ]
      },
      "definesHiddenTokens": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Relationship",
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "associations",
            "operator": "+=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$refText": "Association"
              },
              "arguments": []
            }
          },
          {
            "$type": "Assignment",
            "feature": "compositions",
            "operator": "+=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$refText": "Composition"
              },
              "arguments": []
            }
          },
          {
            "$type": "Assignment",
            "feature": "inheritances",
            "operator": "+=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$refText": "Inheritance"
              },
              "arguments": []
            }
          },
          {
            "$type": "Assignment",
            "feature": "aggregations",
            "operator": "+=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$refText": "Aggregation"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Association",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "association"
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$refText": "RelationshipItem"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$refText": "RelationshipLabel"
            },
            "arguments": [],
            "cardinality": "?"
          },
          {
            "$type": "Keyword",
            "value": "<=>"
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$refText": "RelationshipItem"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$refText": "RelationshipLabel"
            },
            "arguments": [],
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Composition",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "composition"
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$refText": "RelationshipItem"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$refText": "RelationshipLabel"
            },
            "arguments": [],
            "cardinality": "?"
          },
          {
            "$type": "Keyword",
            "value": "=>"
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$refText": "RelationshipItem"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$refText": "RelationshipLabel"
            },
            "arguments": [],
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Aggregation",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "aggregation"
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$refText": "RelationshipItem"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$refText": "RelationshipLabel"
            },
            "arguments": [],
            "cardinality": "?"
          },
          {
            "$type": "Keyword",
            "value": "=>"
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$refText": "RelationshipItem"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$refText": "RelationshipLabel"
            },
            "arguments": [],
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Inheritance",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "inheritance"
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$refText": "RelationshipItem"
            },
            "arguments": []
          },
          {
            "$type": "Keyword",
            "value": "=>"
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$refText": "RelationshipItem"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "RelationshipItem",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "class",
            "operator": "=",
            "terminal": {
              "$type": "CrossReference",
              "type": {
                "$refText": "Class"
              },
              "deprecatedSyntax": false
            }
          },
          {
            "$type": "Assignment",
            "feature": "cardinality",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$refText": "Cardinality"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "RelationshipLabel",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$refText": "Visibility"
            },
            "arguments": []
          },
          {
            "$type": "Assignment",
            "feature": "name",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$refText": "ID"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Cardinality",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "("
          },
          {
            "$type": "Assignment",
            "feature": "amt",
            "operator": "=",
            "terminal": {
              "$type": "Alternatives",
              "elements": [
                {
                  "$type": "RuleCall",
                  "rule": {
                    "$refText": "INT"
                  },
                  "arguments": []
                },
                {
                  "$type": "Keyword",
                  "value": "*"
                },
                {
                  "$type": "Keyword",
                  "value": "+"
                }
              ]
            }
          },
          {
            "$type": "Keyword",
            "value": ")"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Class",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "Class"
          },
          {
            "$type": "Assignment",
            "feature": "name",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$refText": "ID"
              },
              "arguments": []
            }
          },
          {
            "$type": "Assignment",
            "feature": "extension",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$refText": "Extension"
              },
              "arguments": []
            },
            "cardinality": "?"
          },
          {
            "$type": "Assignment",
            "feature": "classBlock",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$refText": "ClassBlock"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Extension",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "extends"
          },
          {
            "$type": "Assignment",
            "feature": "class",
            "operator": "=",
            "terminal": {
              "$type": "CrossReference",
              "type": {
                "$refText": "Class"
              },
              "deprecatedSyntax": false
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ClassBlock",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "{"
          },
          {
            "$type": "Assignment",
            "feature": "attributes",
            "operator": "+=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$refText": "AttributeChoice"
              },
              "arguments": []
            },
            "cardinality": "*"
          },
          {
            "$type": "Assignment",
            "feature": "functions",
            "operator": "+=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$refText": "FunctionChoice"
              },
              "arguments": []
            },
            "cardinality": "*"
          },
          {
            "$type": "Keyword",
            "value": "}"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "AttributeChoice",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "attribute"
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$refText": "Visibility"
            },
            "arguments": []
          },
          {
            "$type": "Assignment",
            "feature": "attribute",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$refText": "Attribute"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "FunctionChoice",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "function"
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$refText": "Visibility"
            },
            "arguments": []
          },
          {
            "$type": "Assignment",
            "feature": "function",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$refText": "Function"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Enum",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "Enum"
          },
          {
            "$type": "Assignment",
            "feature": "name",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$refText": "ID"
              },
              "arguments": []
            }
          },
          {
            "$type": "Assignment",
            "feature": "enumBlock",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$refText": "EnumBlock"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "EnumBlock",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "{"
          },
          {
            "$type": "Assignment",
            "feature": "enumItems",
            "operator": "+=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$refText": "EnumItem"
              },
              "arguments": []
            },
            "cardinality": "*"
          },
          {
            "$type": "Keyword",
            "value": "}"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "EnumItem",
      "definition": {
        "$type": "Assignment",
        "feature": "name",
        "operator": "=",
        "terminal": {
          "$type": "RuleCall",
          "rule": {
            "$refText": "ID"
          },
          "arguments": []
        }
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Attribute",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "name",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$refText": "ID"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": ":"
          },
          {
            "$type": "Alternatives",
            "elements": [
              {
                "$type": "Assignment",
                "feature": "typeDefinition",
                "operator": "=",
                "terminal": {
                  "$type": "CrossReference",
                  "type": {
                    "$refText": "Element"
                  },
                  "deprecatedSyntax": false
                }
              },
              {
                "$type": "RuleCall",
                "rule": {
                  "$refText": "TypeDefinition"
                },
                "arguments": []
              }
            ]
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Element",
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$refText": "Class"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$refText": "Enum"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Function",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "name",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$refText": "ID"
              },
              "arguments": []
            }
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$refText": "Inputs"
            },
            "arguments": []
          },
          {
            "$type": "Keyword",
            "value": ":"
          },
          {
            "$type": "Alternatives",
            "elements": [
              {
                "$type": "Assignment",
                "feature": "typeOutputDefition",
                "operator": "=",
                "terminal": {
                  "$type": "CrossReference",
                  "type": {
                    "$refText": "Element"
                  },
                  "deprecatedSyntax": false
                }
              },
              {
                "$type": "RuleCall",
                "rule": {
                  "$refText": "TypeOutputDefinition"
                },
                "arguments": []
              }
            ]
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Inputs",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "("
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Assignment",
                "feature": "inputs",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$refText": "Input"
                  },
                  "arguments": []
                }
              },
              {
                "$type": "Group",
                "elements": [
                  {
                    "$type": "Keyword",
                    "value": ","
                  },
                  {
                    "$type": "Assignment",
                    "feature": "inputs",
                    "operator": "+=",
                    "terminal": {
                      "$type": "RuleCall",
                      "rule": {
                        "$refText": "Input"
                      },
                      "arguments": []
                    }
                  }
                ],
                "cardinality": "*"
              }
            ],
            "cardinality": "?"
          },
          {
            "$type": "Keyword",
            "value": ")"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Input",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "name",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$refText": "ID"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": ":"
          },
          {
            "$type": "Alternatives",
            "elements": [
              {
                "$type": "Assignment",
                "feature": "typeDefinition",
                "operator": "=",
                "terminal": {
                  "$type": "CrossReference",
                  "type": {
                    "$refText": "Element"
                  },
                  "deprecatedSyntax": false
                }
              },
              {
                "$type": "RuleCall",
                "rule": {
                  "$refText": "TypeDefinition"
                },
                "arguments": []
              }
            ]
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "TypeDefinition",
      "definition": {
        "$type": "Assignment",
        "feature": "data",
        "operator": "=",
        "terminal": {
          "$type": "Alternatives",
          "elements": [
            {
              "$type": "Keyword",
              "value": "int"
            },
            {
              "$type": "Keyword",
              "value": "string"
            },
            {
              "$type": "Keyword",
              "value": "DateTime"
            }
          ]
        }
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Visibility",
      "definition": {
        "$type": "Assignment",
        "feature": "visibility",
        "operator": "=",
        "terminal": {
          "$type": "Alternatives",
          "elements": [
            {
              "$type": "Keyword",
              "value": "#"
            },
            {
              "$type": "Keyword",
              "value": "+"
            },
            {
              "$type": "Keyword",
              "value": "-"
            }
          ]
        }
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "TypeOutputDefinition",
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$refText": "TypeDefinition"
            },
            "arguments": []
          },
          {
            "$type": "Keyword",
            "value": "void"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "TerminalRule",
      "hidden": true,
      "name": "WS",
      "definition": {
        "$type": "RegexToken",
        "regex": "\\\\s+"
      },
      "fragment": false
    },
    {
      "$type": "TerminalRule",
      "name": "DATAINT",
      "definition": {
        "$type": "CharacterRange",
        "left": {
          "$type": "Keyword",
          "value": "int"
        }
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "DATASTRING",
      "definition": {
        "$type": "CharacterRange",
        "left": {
          "$type": "Keyword",
          "value": "string"
        }
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "DATADATETIME",
      "definition": {
        "$type": "CharacterRange",
        "left": {
          "$type": "Keyword",
          "value": "DateTime"
        }
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "ID",
      "definition": {
        "$type": "RegexToken",
        "regex": "[_a-zA-Z][\\\\w_]*"
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "INT",
      "type": {
        "$type": "ReturnType",
        "name": "number"
      },
      "definition": {
        "$type": "RegexToken",
        "regex": "[0-9]+"
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "STRING",
      "definition": {
        "$type": "RegexToken",
        "regex": "\\"[^\\"]*\\"|'[^']*'"
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "VISIBILITY",
      "definition": {
        "$type": "RegexToken",
        "regex": "[#+-]"
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "hidden": true,
      "name": "ML_COMMENT",
      "definition": {
        "$type": "RegexToken",
        "regex": "\\\\/\\\\*[\\\\s\\\\S]*?\\\\*\\\\/"
      },
      "fragment": false
    },
    {
      "$type": "TerminalRule",
      "hidden": true,
      "name": "SL_COMMENT",
      "definition": {
        "$type": "RegexToken",
        "regex": "\\\\/\\\\/[^\\\\n\\\\r]*"
      },
      "fragment": false
    }
  ],
  "definesHiddenTokens": false,
  "hiddenTokens": [],
  "imports": [],
  "interfaces": [],
  "types": [],
  "usedGrammars": []
}`));
