import type { ASTNode } from '../CAstNode/ASTNode';
import type { SourceFile } from '../CAstNode/SourceFile';
import { convertAccess, convertType } from '../Helper';
import TransPrinter from '../Printer/TransPrinter';
import { SynxType } from '../SynxType';
import { TransformerBase } from './TransformerBase';

export class TransformerVarDecl extends TransformerBase {
    public transform(node: ASTNode, sourceFile: SourceFile, printer: TransPrinter): void {
        if (!node.isKind(SynxType.VarDecl)) {
            return;
        }

        const initializer = node.children.length > 0 ? ` = ${node.children[0].getText()}` : "";
        const exportWord = node.parent?.kind === "TranslationUnitDecl" && node.storageClass !== 'static' ? 'export ' : '';
        printer.println(`${exportWord}let ${node.name}: ${convertType(node.type)}${convertAccess(initializer)};`)
    }
} 