import path from 'path';
import { ASTNode } from '../CAstNode/ASTNode';
import type { SourceFile } from '../CAstNode/SourceFile';
import { TransPrinterMgr } from '../Manager/TransPrinterMgr';
import { SynxType } from "../SynxType";
import { TransformerBase } from './TransformerBase';

export class TransformerEnumDecl extends TransformerBase {
    public override transform(node: ASTNode, sourceFile: SourceFile, printer: TransPrinterMgr) {
        if (!node.isKind(SynxType.EnumDecl)) {
            return;
        }

        if (node.includedFrom) {
            const referenced = node.getConstants().filter(item => item.isReferenced);
            if (referenced.length === 0) {
                return;
            }

            // 不是当前src文件夹下的enum, 不生成import
            const baseDir = path.resolve(process.cwd() + '\\src');
            if (node.locFile && !node.locFile.startsWith(baseDir)) {
                return;
            }

            // 没有locFile, 不生成import
            if (!node.locFile) {
                return;
            }

            // 生成import
            let removedExt = node.locFile.substring(0, node.locFile.length - path.extname(node.locFile).length);
            let importPath = path.relative(baseDir, removedExt).replace(/\\/g, '/');

            printer.println(`import { ${node.name} } from '${importPath}';`);


            // 生成 import constant = enum.constant;
            referenced.map(item => printer.println(`import ${item.getName()} = ${node.name!}.${item.getName()};`));
            return;
        }

        if (node.isUsed) {
            console.log(`EnumDecl ${node.name} is used`);
            return;
        }

        // if (node.locFile !== sourceFile.getFilePath()) {
        //     return;
        // }
        printer.println(`export const enum ${node.name} {`);
        printer.addAdvance(1);
        for (const item of node.getConstants()) {
            printer.println(`${item.getName()} = ${item.getValue()},`);
        }
        printer.subAdvance(1);
        printer.println(`}`);
    }
} 