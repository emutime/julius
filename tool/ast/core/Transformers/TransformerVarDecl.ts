import type { ASTNode } from '../CAstNode/ASTNode';
import type { SourceFile } from '../CAstNode/SourceFile';
import { convertAccess, getArrayLengthExp } from '../Helper';
import TransPrinter from '../Printer/TransPrinter';
import { SynxType } from '../SynxType';
import { TransformerBase } from './TransformerBase';

export class TransformerVarDecl extends TransformerBase {
    public transform(node: ASTNode, sourceFile: SourceFile, printer: TransPrinter): void {
        if (!node.isKind(SynxType.VarDecl

        )) {
            return;
        }

        if (node.includedFrom) {
            if (!node.isUsed) {
                return;
            }
        }
        const initializer = node.children.length > 0 ? node.children[0].getText().trim() : "";
        let initializerStr: string;
        if (node.type.isArray) {
            initializerStr = initializer ? ` = new Array(${getArrayLengthExp(node.getText())}).fill(${initializer})` : ` = new Array(${getArrayLengthExp(node.getText())})`;
        } else if (node.type.isStruct) {
            initializerStr = initializer ? ` = new ${node.type.typeDesc}(${initializer.split('{')[1].split('}')[0].trim()})` : ` = new ${node.type.typeDesc}()`;
        } else {
            initializerStr = initializer ? ` = ${initializer}` : "";
        }
        const exportWord = node.parent?.kind === "TranslationUnitDecl" && node.storageClass !== 'static' ? 'export ' : '';
        printer.println(`${exportWord}let ${node.name}: ${node.type.typeDesc}${convertAccess(initializerStr)}`)
    }
} 