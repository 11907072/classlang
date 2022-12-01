 import { AbstractFormatter, AstNode, Formatting } from 'langium';
 import * as ast from './generated/ast';
 
 export class ClassLanguageFormatter extends AbstractFormatter {
 
     protected format(node: AstNode): void {
         if (ast.isClass(node)) {
             const formatter = this.getNodeFormatter(node);
             const bracesOpen = formatter.keyword('{');
             const bracesClose = formatter.keyword('}');
             formatter.interior(bracesOpen, bracesClose).prepend(Formatting.indent());
             bracesClose.prepend(Formatting.newLine());
         }
         else if (ast.isEnum(node)) {
            const formatter = this.getNodeFormatter(node);
            const bracesOpen = formatter.keyword('{');
            const bracesClose = formatter.keyword('}');
            formatter.interior(bracesOpen, bracesClose).prepend(Formatting.indent());
            bracesClose.prepend(Formatting.newLine());
        }
     }
 
 }