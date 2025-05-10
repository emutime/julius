import { ASTNode } from "../CAstNode/ASTNode";
import { SourceFile } from "../CAstNode/SourceFile";
import { convertAccess } from "../Helper";
import TransPrinter from '../Printer/TransPrinter';
import { SynxType } from "../SynxType";
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

    public transformSynx(node: ASTNode, sourceFile: SourceFile, printer: TransPrinter): void {
        const transformer = this.getTransformer(node.kind);
        if (transformer) {
            transformer.transform(node, sourceFile, printer);
        } else if (node.parent && node.parent.kind !== SynxType.SourceFile) {
            printer.print(convertAccess(node.getText()));
        }
    }

    public transformStmt(node: ASTNode, sourceFile: SourceFile, printer: TransPrinter): void {
        this.transformSynx(node, sourceFile, printer);
        if (node.kind === SynxType.VarDecl ||
            node.kind === SynxType.CallExpr ||
            node.kind === SynxType.DeclStmt ||
            node.kind === SynxType.BinaryOperator ||
            node.kind === SynxType.ReturnStmt ||
            node.kind === SynxType.UnaryOperator
        ) {
            printer.printStr(";");
        }
    }

    public transformStmts(nodes: ASTNode[], sourceFile: SourceFile, printer: TransPrinter): void {
        nodes.map(node => this.transformStmt(node, sourceFile, printer));
    }
}