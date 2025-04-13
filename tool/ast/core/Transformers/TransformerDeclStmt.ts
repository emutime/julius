import { VariableDeclarationKind, type SourceFile as SourceFileTS } from 'ts-morph';
import type { ASTNode } from '../CAstNode/ASTNode';
import type { SourceFile } from '../CAstNode/SourceFile';
import { convertType } from '../Helper';
import { SynxType } from '../SynxType';
import { TransformerBase } from './TransformerBase';

export class TransformerDeclStmt extends TransformerBase {
    public transform(node: ASTNode, sourceFile: SourceFile, sourceFileTS: SourceFileTS): void {
        if (!node.isKind(SynxType.DeclStmt)) {
            return;
        }

        const variableStatement = sourceFileTS.addVariableStatement({
            declarationKind: VariableDeclarationKind.Let,
            declarations: node.varDecls.map(varDecl => {
                return {
                    name: varDecl.name,
                    type: convertType(varDecl.type),
                    initializer: varDecl.children.length > 0 ? varDecl.children[0].getText() : undefined,
                }
            })
        });
    }
} 