import { ASTNode } from '../CAstNode/ASTNode';
import type { SourceFile } from '../CAstNode/SourceFile';
import { convertAccess } from '../Helper';
import { TransformerMgr } from '../Manager/TransformerMgr';
import { TransPrinterMgr } from '../Manager/TransPrinterMgr';
import { SynxType } from "../SynxType";
import { TransformerBase } from './TransformerBase';

export class TransformerSwitchStmt extends TransformerBase {
    public override transform(node: ASTNode, sourceFile: SourceFile, printer: TransPrinterMgr) {
        if (!node.isKind(SynxType.SwitchStmt)) {
            return;
        }

        printer.println(`switch (${convertAccess(node.expr.getText())}) {`);
        printer.addAdvance(1);
        TransformerMgr.instance.transformSynxs(node.compoundStmt.body, sourceFile, printer); // node.compoundStmt.body.map(n => convertStatement()).join('\n');
        printer.subAdvance(1);
        printer.println(`}`);
    }
} 