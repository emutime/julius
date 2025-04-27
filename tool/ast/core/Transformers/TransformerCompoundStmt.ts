import type { ASTNode } from '../CAstNode/ASTNode';
import type { SourceFile } from '../CAstNode/SourceFile';
import { TransformerMgr } from '../Manager/TransformerMgr';
import TransPrinter from '../Printer/TransPrinter';
import { SynxType } from '../SynxType';
import { TransformerBase } from './TransformerBase';

export class TransformerCompoundStmt extends TransformerBase {
    public transform(node: ASTNode, sourceFile: SourceFile, printer: TransPrinter): void {
        if (!node.isKind(SynxType.CompoundStmt)) {
            return;
        }
        printer.println(`{`);
        // function body
        printer.addAdvance(1);
        TransformerMgr.instance.transformStmts(node.body, sourceFile, printer);
        printer.subAdvance(1);
        printer.println(`}`);
    }
} 