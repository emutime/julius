import type { ASTNode } from '../CAstNode/ASTNode';
import type { SourceFile } from '../CAstNode/SourceFile';
import { TransPrinterMgr } from '../Manager/TransPrinterMgr';

export abstract class TransformerBase {
    public abstract transform(node: ASTNode, sourceFile: SourceFile | null, printer: TransPrinterMgr): void;
} 