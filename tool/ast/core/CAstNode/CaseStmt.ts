import { ASTNode } from "./ASTNode";

export class CaseStmt extends ASTNode {
    public expr: ASTNode;
    public stmts: Array<ASTNode> = [];
    public constructor(node: Record<string, any>) {
        super(node);
        this.expr = this.children[0];
        this.stmts = this.children.slice(1);
    }
}
