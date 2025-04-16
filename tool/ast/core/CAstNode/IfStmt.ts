import { ASTNode } from "./ASTNode";

export class IfStmt extends ASTNode {
    public hasElse: boolean = false;
    public expr: ASTNode;
    public stmt: ASTNode;
    public elseStmt?: ASTNode;
    public constructor(node: Record<string, any>) {
        super(node);
        this.hasElse = !!this.node["hasElse"];
        this.expr = this.children[0];
        this.stmt = this.children[1];
        if (this.hasElse) {
            this.elseStmt = this.children[2];
        }
    }
}