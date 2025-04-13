import { SourceFile as TSSourceFile } from "ts-morph";
import { ASTNode } from "../CAstNode/ASTNode";
import { SourceFile } from "../CAstNode/SourceFile";
import { TransformerBase } from "../Transformers/TransformerBase";

export class TransformerMgr {
    public static instance: TransformerMgr = new TransformerMgr();

    private m_tmpSrcFileTS: TSSourceFile | null = null;
    private m_transformers = new Map<string, TransformerBase>();

    public setTmpSrcFileTS(tmpSrcFileTS: TSSourceFile): void {
        this.m_tmpSrcFileTS = tmpSrcFileTS;
    }

    public regTransformer(kind: string, transformer: TransformerBase) {
        this.m_transformers.set(kind, transformer);
    }

    public getTransformer(kind: string): TransformerBase | undefined {
        return this.m_transformers.get(kind);
    }

    public transform(node: SourceFile, sourceFile: TSSourceFile) {
        node.children.forEach(child => {
            const transformer = this.getTransformer(child.kind);
            if (transformer) {
                transformer.transform(child, node, sourceFile);
            }
        });
    }

    public transformSynx(node: ASTNode, sourceFile: SourceFile): string {
        if (this.m_tmpSrcFileTS === null) {
            return "";
        }
        this.m_tmpSrcFileTS.replaceWithText("");
        const transformer = this.getTransformer(node.kind);
        if (transformer) {
            transformer.transform(node, sourceFile, this.m_tmpSrcFileTS);
            return this.m_tmpSrcFileTS.getFullText();
        } else {
            return node.getText();
        }
    }
}