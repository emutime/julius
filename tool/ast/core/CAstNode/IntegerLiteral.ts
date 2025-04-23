import { ASTNode } from "./ASTNode";

export class IntegerLiteral extends ASTNode {
    public body: ASTNode[] = [];
    public constructor(node: Record<string, any>) {
        super(node);
        this.body = this.children;
    }
}    