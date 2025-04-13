import path from 'path';
import type { SourceFile as SourceFileTS } from 'ts-morph';
import { ASTNode } from '../CAstNode/ASTNode';
import type { SourceFile } from '../CAstNode/SourceFile';
import { convertType } from '../Helper';
import { SynxType } from "../SynxType";
import { TransformerBase } from './TransformerBase';

export class TransformerFunctionDecl extends TransformerBase {
    public override transform(node: ASTNode, sourceFile: SourceFile, sourceFileTS: SourceFileTS) {
        if (!node.isKind(SynxType.FunctionDecl)) {
            return;
        }

        if (node.includedFrom) {
            if (!node.isUsed) {
                return;
            }

            let importPath = "";
            if (node.locFile) {
                importPath = path.posix.normalize(path.relative(process.cwd() + '/src', node.locFile.substring(0, node.locFile.length - path.extname(node.locFile).length)));
                importPath = importPath.replace(/\\/g, '/');
            } else {
                console.assert(false, "FunctionDecl without location");
            }

            sourceFileTS.addImportDeclaration({
                moduleSpecifier: importPath,
                defaultImport: node.name,
            });

            return;
        }

        if (node.compoundStmt === undefined) {
            return;
        }
        const parameters = node.getParmVarDecl().map(p => { return { name: p.name!, type: convertType(p.type) } });

        const functionDecl = sourceFileTS.addFunction({
            name: node.name!,
            isExported: node.storageClass !== 'static',
            parameters: parameters,
            returnType: convertType(node.getReturnType()),
            statements: [],
        });

    }
} 