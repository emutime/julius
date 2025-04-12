import type { SourceFile } from 'ts-morph';
import type { ASTNode } from '../CAstNode/ASTNode';

export abstract class TransformerBase {
    public abstract transform(node: ASTNode, parent: ASTNode | undefined, sourceFile: SourceFile): void;
} 