import { ASTNode } from '../CAstNode/ASTNode';
import type { SourceFile } from '../CAstNode/SourceFile';
import { TransformerMgr } from '../Manager/TransformerMgr';
import TransPrinter from '../Printer/TransPrinter';
import { SynxType } from "../SynxType";
import { TransformerBase } from './TransformerBase';

export class TransformerCaseStmt extends TransformerBase {
    public override transform(node: ASTNode, sourceFile: SourceFile, printer: TransPrinter) {
        if (!node.isKind(SynxType.CaseStmt)) {
            return;
        }

        printer.println(`case ${node.expr.getText()}:`);
        printer.addAdvance(1);
        TransformerMgr.instance.transformSynxs(node.stmts, sourceFile, printer);
        printer.subAdvance(1);
    }
} 