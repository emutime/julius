import type { SourceFile } from 'ts-morph';
import { ASTNode } from '../CAstNode/ASTNode';
import { SynxType } from "../SynxType";
import { TransformerBase } from './TransformerBase';

export class TransformerEnumDecl extends TransformerBase {
    public override transform(node: ASTNode, parent: ASTNode | undefined, sourceFile: SourceFile) {
        if (!node.isKind(SynxType.EnumDecl)) {
            return;
        }
        
        const enumElem = sourceFile.addEnum({
            name: node.name!,
            isExported: true,
            isConst: true,
        })

        for (const item of node.getConstants()) {
            enumElem.addMember({
                name: item.getName(),
                initializer: item.getValue()
            });
        }
    }
} 