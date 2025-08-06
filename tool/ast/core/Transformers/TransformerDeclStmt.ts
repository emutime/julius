import type { ASTNode } from '../CAstNode/ASTNode';
import type { SourceFile } from '../CAstNode/SourceFile';
import { convertAccess } from '../Helper';
import TransPrinter from '../Printer/TransPrinter';
import { SynxType } from '../SynxType';
import { TransformerBase } from './TransformerBase';

export class TransformerDeclStmt extends TransformerBase {
    public transform(node: ASTNode, sourceFile: SourceFile, printer: TransPrinter): void {
        if (!node.isKind(SynxType.DeclStmt)) {
            return;
        }

        node.varDecls.forEach(varDecl => {
            let initializer = varDecl.children.length > 0 ? varDecl.children[0].getText() : "";
            if (initializer === "0" && varDecl.type.isPointer === true) {
                initializer = "null";
            }

            let initializerStr = initializer !== "" ? ` = ${initializer}` : "";
            printer.println(`let ${varDecl.name}: ${varDecl.type.typeDesc}${convertAccess(initializerStr)}`)
        })
    }
} 