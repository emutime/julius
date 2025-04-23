import type { ASTNode } from '../CAstNode/ASTNode';
import { IfStmt } from '../CAstNode/IfStmt';
import type { SourceFile } from '../CAstNode/SourceFile';
import { convertAccess } from '../Helper';
import { TransformerMgr } from '../Manager/TransformerMgr';
import TransPrinter from '../Printer/TransPrinter';
import { SynxType } from '../SynxType';
import { TransformerBase } from './TransformerBase';

export class TransformerIfStmt extends TransformerBase {
    public transform(node: ASTNode, sourceFile: SourceFile, printer: TransPrinter): void {
        if (!node.isKind(SynxType.IfStmt)) {
            return;
        }

        this.transformIfStmt(node as IfStmt, sourceFile, false, printer);
    }

    public transformIfStmt(node: IfStmt, sourceFile: SourceFile, prevHasElse: boolean = false, printer: TransPrinter): void {
        const exprText = convertAccess(node.expr.getText());
        if (prevHasElse) {
            printer.println(`} else if (${exprText}) {`);
        } else {
            printer.println(`if (${exprText}) {`);
        }

        printer.addAdvance(1);
        if (node.stmt.isKind(SynxType.CompoundStmt)) {
            TransformerMgr.instance.transformSynxs(node.stmt.body, sourceFile, printer);
        } else {
            TransformerMgr.instance.transformSynx(node.stmt, sourceFile, printer);
        }
        printer.subAdvance(1);
        if (node.elseStmt) {
            if (node.elseStmt.isKind(SynxType.IfStmt)) {
                this.transformIfStmt(node.elseStmt, sourceFile, true, printer);
            } else {
                printer.println(`} else {`);
            }
        } else {
            printer.println(`}`);
        }
    }
} 