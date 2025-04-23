import type { ASTNode } from '../CAstNode/ASTNode';
import type { SourceFile } from '../CAstNode/SourceFile';
import TransPrinter from '../Printer/TransPrinter';

export abstract class TransformerBase {
    public abstract transform(node: ASTNode, sourceFile: SourceFile | null, printer: TransPrinter): void;
} 