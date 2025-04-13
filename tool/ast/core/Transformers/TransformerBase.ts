import type { SourceFile as SourceFileTS } from 'ts-morph';
import type { ASTNode } from '../CAstNode/ASTNode';
import type { SourceFile } from '../CAstNode/SourceFile';

export abstract class TransformerBase {
    public abstract transform(node: ASTNode, sourceFile: SourceFile | null, sourceFileTS: SourceFileTS): void;
} 