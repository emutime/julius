import type { ASTNode } from '../CAstNode/ASTNode';
import type { SourceFile } from '../CAstNode/SourceFile';
import { convertAccess } from '../Helper';
import TransPrinter from '../Printer/TransPrinter';
import { SynxType } from '../SynxType';
import { TransformerBase } from './TransformerBase';

export class TransformerReturnStmt extends TransformerBase {
    public transform(node: ASTNode, sourceFile: SourceFile, printer: TransPrinter): void {
        if (!node.isKind(SynxType.ReturnStmt)) {
            return;
        }

        printer.println(`${convertAccess(node.getText())}; `);
    }
} 