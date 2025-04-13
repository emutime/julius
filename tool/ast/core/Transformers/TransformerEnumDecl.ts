import type { SourceFile as SourceFileTS } from 'ts-morph';
import { ASTNode } from '../CAstNode/ASTNode';
import type { SourceFile } from '../CAstNode/SourceFile';
import { SynxType } from "../SynxType";
import { TransformerBase } from './TransformerBase';

export class TransformerEnumDecl extends TransformerBase {
    public override transform(node: ASTNode, sourceFile: SourceFile, sourceFileTS: SourceFileTS) {
        if (!node.isKind(SynxType.EnumDecl)) {
            return;
        }

        if (node.isUsed) {
            console.log(`EnumDecl ${node.name} is used`);
            return;
        }

        if (node.locFile !== sourceFileTS.getFilePath()) {
            return;
        }

        const enumElem = sourceFileTS.addEnum({
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