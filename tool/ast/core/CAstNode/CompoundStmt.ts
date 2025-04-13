import { ASTNode } from "./ASTNode";

export class CompoundStmt extends ASTNode {
    public constructor(node: Record<string, any>) {
        super(node);
    }
}    