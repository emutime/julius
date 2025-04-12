import { SourceFile as TSSourceFile } from "ts-morph";
import { SourceFile } from "../CAstNode/SourceFile";
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

    public transform(node: SourceFile, sourceFile: TSSourceFile) {
        node.children.forEach(child => {
            const transformer = this.getTransformer(child.kind);
            if (transformer) {
                transformer.transform(child, node, sourceFile);
            }
        });
    }
}