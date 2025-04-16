import { SynxType } from "../SynxType";
import { ASTNode } from "./ASTNode";
import { CompoundStmt } from "./CompoundStmt";

export class SwitchStmt extends ASTNode {
    public hasDefault: boolean = false;
    public expr: ASTNode;
    public compoundStmt: CompoundStmt;
    public constructor(node: Record<string, any>) {
        super(node);
        this.hasDefault = !!this.node["hasDefault"];
        this.expr = this.children[0];
        if (this.children[1].isKind(SynxType.CompoundStmt)) {
            this.compoundStmt = this.children[1];
        } else {
            throw new Error("Invalid compound statement");
        }
    }
}
