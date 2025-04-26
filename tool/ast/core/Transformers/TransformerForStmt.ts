import { ASTNode } from '../CAstNode/ASTNode';
import type { SourceFile } from '../CAstNode/SourceFile';
import { TransformerMgr } from '../Manager/TransformerMgr';
import TransPrinter from '../Printer/TransPrinter';
import { SynxType } from "../SynxType";
import { TransformerBase } from './TransformerBase';

export class TransformerForStmt extends TransformerBase {
    public override transform(node: ASTNode, sourceFile: SourceFile, printer: TransPrinter) {
        if (!node.isKind(SynxType.ForStmt)) {
            return;
        }

        const inforStmt = node.inforStmt.filter(n => n.kind !== undefined).map(n => {
            const inforPrit = new TransPrinter();
            TransformerMgr.instance.transformSynx(n, sourceFile, inforPrit);
            return inforPrit.getContent();
        }).join('; ');

        printer.println(`for (${inforStmt}) {`);
        if (node.compoundStmt) {
            printer.addAdvance(1);
            TransformerMgr.instance.transformStmts(node.compoundStmt.body, sourceFile, printer);
            printer.subAdvance(1);
        }
        printer.println(`}`);
    }
} 