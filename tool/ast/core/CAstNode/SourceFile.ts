import { ASTNode } from "./ASTNode";

export class SourceFile extends ASTNode {
    public readonly filePath: string;
    public constructor(node: Record<string, any>, filePath: string) {
        super(node);
        this.filePath = filePath;
    }
}