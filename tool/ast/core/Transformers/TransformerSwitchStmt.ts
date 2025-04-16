import { ASTNode } from '../CAstNode/ASTNode';
import type { SourceFile } from '../CAstNode/SourceFile';
import { TransPrinterMgr } from '../Manager/TransPrinterMgr';
import { SynxType } from "../SynxType";
import { TransformerBase } from './TransformerBase';

export class TransformerSwitchStmt extends TransformerBase {
    public override transform(node: ASTNode, sourceFile: SourceFile, printer: TransPrinterMgr) {
        if (!node.isKind(SynxType.SwitchStmt)) {
            return;
        }
    }
} 