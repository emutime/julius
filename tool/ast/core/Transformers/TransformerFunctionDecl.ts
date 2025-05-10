import path from 'path';
import { ASTNode } from '../CAstNode/ASTNode';
import type { SourceFile } from '../CAstNode/SourceFile';
import { TransformerMgr } from '../Manager/TransformerMgr';
import TransPrinter from '../Printer/TransPrinter';
import { SynxType } from "../SynxType";
import { TransformerBase } from './TransformerBase';

export class TransformerFunctionDecl extends TransformerBase {
    public override transform(node: ASTNode, sourceFile: SourceFile, printer: TransPrinter) {
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

            printer.println(`import { ${node.name} } from '${importPath}';`);
            return;
        }

        if (node.compoundStmt === undefined) {
            return;
        }

        const returnType = node.getReturnType().typeDesc;
        const exportWord = node.storageClass !== 'static' ? 'export ' : '';
        const parameters = node.getParmVarDecl().map(p => { return { name: p.name!, type: p.type.typeDesc } });

        // fuction declaration
        printer.println(`${exportWord}function ${node.name}(${parameters.map(p => `${p.name}: ${p.type}`).join(', ')}) {`);

        // function body
        printer.addAdvance(1);
        TransformerMgr.instance.transformStmts(node.compoundStmt.body, sourceFile, printer); // node.compoundStmt.body.map(n => convertStatement()).join('\n');
        printer.subAdvance(1);
        printer.println(`}`);
    }
} 