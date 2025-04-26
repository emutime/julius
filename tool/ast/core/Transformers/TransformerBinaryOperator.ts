import type { ASTNode } from '../CAstNode/ASTNode';
import type { SourceFile } from '../CAstNode/SourceFile';
import { convertAccess } from '../Helper';
import TransPrinter from '../Printer/TransPrinter';
import { SynxType } from '../SynxType';
import { TransformerBase } from './TransformerBase';

export class TransformerBinaryOperator extends TransformerBase {
    public transform(node: ASTNode, sourceFile: SourceFile, printer: TransPrinter): void {
        if (!node.isKind(SynxType.BinaryOperator)) {
            return;
        }

        printer.println(`${convertAccess(node.getText())}; `);
    }
} 