import { ASTNode } from "../CAstNode/ASTNode";
import { SourceFile } from "../CAstNode/SourceFile";
import { convertAccess } from "../Helper";
import { TransformerBase } from "../Transformers/TransformerBase";
import { TransPrinterMgr } from './TransPrinterMgr';


export class TransformerMgr {
    public static instance: TransformerMgr = new TransformerMgr();

    private m_transformers = new Map<string, TransformerBase>();

    public regTransformer(kind: string, transformer: TransformerBase) {
        this.m_transformers.set(kind, transformer);
    }

    public getTransformer(kind: string): TransformerBase | undefined {
        return this.m_transformers.get(kind);
    }

    public transform(node: SourceFile, printer: TransPrinterMgr) {
        node.children.forEach(child => {
            const transformer = this.getTransformer(child.kind);
            if (transformer) {
                transformer.transform(child, node, printer);
            }
        });
    }

    public transformSynx(node: ASTNode, sourceFile: SourceFile, printer: TransPrinterMgr): void {
        const transformer = this.getTransformer(node.kind);
        if (transformer) {
            transformer.transform(node, sourceFile, printer);
        } else {
            printer.print(convertAccess(node.getText()));
        }
    }

    public transformSynxs(nodes: ASTNode[], sourceFile: SourceFile, printer: TransPrinterMgr): void {
        nodes.map(node => this.transformSynx(node, sourceFile, printer));
    }
}