import path from 'path';
import { ASTNode } from '../CAstNode/ASTNode';
import type { SourceFile } from '../CAstNode/SourceFile';
import TransPrinter from '../Printer/TransPrinter';
import { SynxType } from "../SynxType";
import { TransformerBase } from './TransformerBase';

export class TransformerTypedefDecl extends TransformerBase {
    public override transform(node: ASTNode, sourceFile: SourceFile, printer: TransPrinter) {
        if (!node.isKind(SynxType.TypedefDecl)) {
            return;
        }

        // // 头文件中被包含的typedef
        // if (sourceFile.filePath.endsWith('.h')) {
        //     if (node.includedFrom) {
        //         return;
        //     }

        //     const orgName = node.elaboratedType?.getOwnedTagDeclNode()?.name;
        //     if (orgName) {
        //         sourceFileTS.addExportDeclaration({
        //             namedExports: [{
        //                 name: orgName,
        //                 alias: node.name,
        //             }]
        //         });
        //     }

        //     return
        // }

        if (node.includedFrom) {
            if (!node.isReferenced) {
                return;
            }

            const baseDir = path.resolve(process.cwd() + '\\src');
            if (node.locFile && !node.locFile.startsWith(baseDir)) {
                return;
            }

            let importPath = "";
            if (node.locFile) {
                importPath = path.posix.normalize(path.relative(baseDir, node.locFile.substring(0, node.locFile.length - path.extname(node.locFile).length)));
                importPath = importPath.replace(/\\/g, '/');
            } else {
                console.assert(false, "TypedefDecl without location");
            }

            printer.println(`import { ${node.name} } from '${importPath}';`);
            return;
        }
    }
} 