import { ASTNode } from "../CAstNode/ASTNode";
import { SourceFile } from "../CAstNode/SourceFile";
import { convertAccess } from "../Helper";
import TransPrinter from '../Printer/TransPrinter';
import { TransformerBase } from "../Transformers/TransformerBase";


export class TransformerMgr {
    public static instance: TransformerMgr = new TransformerMgr();

    private m_transformers = new Map<string, TransformerBase>();

    public regTransformer(kind: string, transformer: TransformerBase) {
        this.m_transformers.set(kind, transformer);
    }

    public getTransformer(kind: string): TransformerBase | undefined {
        return this.m_transformers.get(kind);
    }

    public transform(node: SourceFile, printer: TransPrinter) {
        node.children.forEach(child => {
            const transformer = this.getTransformer(child.kind);
            if (transformer) {
                transformer.transform(child, node, printer);
            }
        });
    }

    public transformSynx(node: ASTNode, sourceFile: SourceFile, printer: TransPrinter): void {
        const transformer = this.getTransformer(node.kind);
        if (transformer) {
            transformer.transform(node, sourceFile, printer);
        } else {
            printer.print(convertAccess(node.getText()));
        }
    }

    public transformSynxs(nodes: ASTNode[], sourceFile: SourceFile, printer: TransPrinter): void {
        nodes.map(node => this.transformSynx(node, sourceFile, printer));
    }
}